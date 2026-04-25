const router = require('express').Router();
const Joi = require('joi');
const Contact = require('../models/Contact');
const env = require('../config/env');
const { validate } = require('../middleware/validate');

const createSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().pattern(/^\d{10}$/).required(),
  message: Joi.string().min(5).max(500).required(),
});

router.post('/', validate(createSchema), async (req, res, next) => {
  try {
    await Contact.create({ ...req.body, status: 'OPEN' });
    res.status(201).json({ message: 'Contact saved' });
  } catch (e) {
    next(e);
  }
});

router.get('/', (_req, res) => {
  res.json(env.contactInfo);
});

module.exports = router;
