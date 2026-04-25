const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    popularity: { type: Number, default: 0 },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

productSchema.virtual('productId').get(function () {
  return this._id.toString();
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model('Product', productSchema);
