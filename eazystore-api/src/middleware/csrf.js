const crypto = require('crypto');

const COOKIE = 'XSRF-TOKEN';
const HEADER = 'x-xsrf-token';
const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);

// Spring-style CSRF: cookie value == header value, both readable to JS.
// Frontend's apiClient.js relies on reading XSRF-TOKEN cookie via js-cookie
// and echoing it back in the X-XSRF-TOKEN header on unsafe methods.

function ensureToken(req, res) {
  let token = req.cookies?.[COOKIE];
  if (!token) {
    token = crypto.randomBytes(32).toString('hex');
    res.cookie(COOKIE, token, {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
  }
  return token;
}

function csrfProtection(req, res, next) {
  if (SAFE.has(req.method)) {
    ensureToken(req, res);
    return next();
  }
  const cookieToken = req.cookies?.[COOKIE];
  const headerToken = req.headers[HEADER];
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ errorMessage: 'CSRF token missing or invalid' });
  }
  return next();
}

module.exports = { ensureToken, csrfProtection };
