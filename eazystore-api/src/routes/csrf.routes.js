const router = require('express').Router();
const { ensureToken } = require('../middleware/csrf');

router.get('/', (req, res) => {
  const token = ensureToken(req, res);
  res.json({ token });
});

module.exports = router;
