const jwt = require('jsonwebtoken');
const env = require('../config/env');
const Customer = require('../models/Customer');

function signToken(customer) {
  return jwt.sign(
    { sub: customer._id.toString(), roles: customer.roles, email: customer.email },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );
}

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ errorMessage: 'Missing auth token' });
  try {
    const payload = jwt.verify(token, env.jwt.secret);
    const customer = await Customer.findById(payload.sub);
    if (!customer) return res.status(401).json({ errorMessage: 'User not found' });
    req.customer = customer;
    return next();
  } catch (err) {
    return res.status(401).json({ errorMessage: 'Invalid or expired token' });
  }
}

function requireRole(role) {
  const wanted = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
  return (req, res, next) => {
    if (!req.customer) return res.status(401).json({ errorMessage: 'Unauthorized' });
    if (!(req.customer.roles || []).includes(wanted)) {
      return res.status(403).json({ errorMessage: 'Forbidden' });
    }
    return next();
  };
}

module.exports = { signToken, requireAuth, requireRole };
