require('dotenv').config();

module.exports = {
  port: parseInt(process.env.PORT, 10) || 8080,
  jwt: {
    secret: process.env.JWT_SECRET || 'change_me',
    expiresIn: process.env.JWT_EXPIRES_IN || '4h',
  },
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  cookieSecret: process.env.COOKIE_SECRET || 'cookie_change_me',
  mongo: {
    url: process.env.MONGO_URL,
    dbPath: process.env.MONGO_DB_PATH || './mongo-data',
  },
  contactInfo: {
    phone: process.env.CONTACT_PHONE || '+91-1234567890',
    email: process.env.CONTACT_EMAIL || 'dev@eazystore.com',
    address: process.env.CONTACT_ADDRESS || '123 Main Street, Anytown, USA',
  },
};
