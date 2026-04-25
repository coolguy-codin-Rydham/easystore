const router = require('express').Router();
const Joi = require('joi');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const updateSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().pattern(/^\d{10}$/).required(),
  street: Joi.string().min(5).max(30).required(),
  city: Joi.string().min(3).max(30).required(),
  state: Joi.string().min(2).max(30).required(),
  postalCode: Joi.string().pattern(/^\d{5}$/).required(),
  country: Joi.string().length(2).required(),
});

function toProfileResponse(c, emailUpdated = false) {
  const out = {
    name: c.name,
    email: c.email,
    mobileNumber: c.mobileNumber,
    address: {
      street: c.address?.street || '',
      city: c.address?.city || '',
      state: c.address?.state || '',
      postalCode: c.address?.postalCode || '',
      country: c.address?.country || '',
    },
  };
  if (emailUpdated) out.emailUpdated = true;
  return out;
}

router.get('/', requireAuth, (req, res) => {
  res.json(toProfileResponse(req.customer));
});

router.put('/', requireAuth, validate(updateSchema), async (req, res, next) => {
  try {
    const c = req.customer;
    const { name, email, mobileNumber, street, city, state, postalCode, country } = req.body;
    const emailUpdated = c.email !== email.toLowerCase();
    c.name = name;
    c.email = email;
    c.mobileNumber = mobileNumber;
    c.address = { street, city, state, postalCode, country };
    await c.save();
    res.json(toProfileResponse(c, emailUpdated));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
