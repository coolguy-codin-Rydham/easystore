const router = require('express').Router();
const Product = require('../models/Product');

router.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ popularity: -1 });
    res.json(products);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
