const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('./config/env');
const { csrfProtection } = require('./middleware/csrf');
const { notFound, errorHandler } = require('./middleware/error');

function buildApp() {
  const app = express();

  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser(env.cookieSecret));

  app.use('/api/v1', csrfProtection);

  app.use('/api/v1/csrf-token', require('./routes/csrf.routes'));
  app.use('/api/v1/auth', require('./routes/auth.routes'));
  app.use('/api/v1/products', require('./routes/products.routes'));
  app.use('/api/v1/orders', require('./routes/orders.routes'));
  app.use('/api/v1/profile', require('./routes/profile.routes'));
  app.use('/api/v1/contacts', require('./routes/contacts.routes'));
  app.use('/api/v1/admin', require('./routes/admin.routes'));

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = { buildApp };
