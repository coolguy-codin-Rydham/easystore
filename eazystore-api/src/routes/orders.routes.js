const router = require('express').Router();
const Joi = require('joi');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

const createSchema = Joi.object({
  totalPrice: Joi.number().min(0).required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
}).unknown(true);

router.post('/', requireAuth, validate(createSchema), async (req, res, next) => {
  try {
    const { totalPrice, items } = req.body;
    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const byId = new Map(products.map((p) => [p._id.toString(), p]));
    const enriched = items.map((i) => {
      const p = byId.get(i.productId);
      return {
        productId: i.productId,
        productName: p?.name || 'Unknown',
        imageUrl: p?.imageUrl || '',
        quantity: i.quantity,
        price: i.price,
      };
    });
    const order = await Order.create({
      customer: req.customer._id,
      items: enriched,
      totalPrice,
      status: 'PENDING',
    });
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.customer._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
