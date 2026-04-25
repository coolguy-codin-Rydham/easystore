const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobileNumber: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    address: { type: addressSchema, default: () => ({}) },
    roles: { type: [String], default: ['ROLE_USER'] },
  },
  { timestamps: true }
);

customerSchema.virtual('customerId').get(function () {
  return this._id.toString();
});

customerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.passwordHash;
    return ret;
  },
});

module.exports = mongoose.model('Customer', customerSchema);
