const router = require('express').Router();
const Order = require('../models/Order');
const Contact = require('../models/Contact');
const { requireAuth, requireRole } = require('../middleware/auth');

router.use(requireAuth, requireRole('ADMIN'));

router.get('/orders', async (_req, res, next) => {
  try {
    const orders = await Order.find({ status: 'PENDING' }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    next(e);
  }
});

router.patch('/orders/:orderId/confirm', async (req, res, next) => {
  try {
    const o = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: 'CONFIRMED' },
      { new: true }
    );
    if (!o) return res.status(404).json({ errorMessage: 'Order not found' });
    res.json(o);
  } catch (e) {
    next(e);
  }
});

router.patch('/orders/:orderId/cancel', async (req, res, next) => {
  try {
    const o = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: 'CANCELLED' },
      { new: true }
    );
    if (!o) return res.status(404).json({ errorMessage: 'Order not found' });
    res.json(o);
  } catch (e) {
    next(e);
  }
});

router.get('/messages', async (_req, res, next) => {
  try {
    const list = await Contact.find({ status: 'OPEN' }).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.patch('/messages/:contactId/close', async (req, res, next) => {
  try {
    const c = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { status: 'CLOSED' },
      { new: true }
    );
    if (!c) return res.status(404).json({ errorMessage: 'Message not found' });
    res.json(c);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
