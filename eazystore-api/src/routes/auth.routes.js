const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const Customer = require('../models/Customer');
const { signToken } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const registerSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().pattern(/^\d{10}$/).required(),
  password: Joi.string().min(8).max(20).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

function buildUserDto(c) {
  return {
    name: c.name,
    email: c.email,
    mobileNumber: c.mobileNumber,
    address: c.address || {},
    roles: c.roles || [],
  };
}

router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, mobileNumber, password } = req.body;
    const exists = await Customer.findOne({
      $or: [{ email: email.toLowerCase() }, { mobileNumber }],
    });
    if (exists) {
      const errors = {};
      if (exists.email === email.toLowerCase()) errors.email = 'Email already registered';
      if (exists.mobileNumber === mobileNumber) errors.mobileNumber = 'Mobile number already registered';
      return res.status(400).json(errors);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await Customer.create({
      name,
      email,
      mobileNumber,
      passwordHash,
      roles: ['ROLE_USER'],
    });
    res.status(201).json({ message: 'Registered' });
  } catch (e) {
    next(e);
  }
});

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const c = await Customer.findOne({
      $or: [{ email: username.toLowerCase() }, { mobileNumber: username }],
    });
    if (!c) return res.status(401).json({ errorMessage: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, c.passwordHash);
    if (!ok) return res.status(401).json({ errorMessage: 'Invalid credentials' });
    const jwtToken = signToken(c);
    res.json({ message: 'Login successful', user: buildUserDto(c), jwtToken });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
