const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  product_id: { type: String, required: true },
  user_id: { type: String, required: true },
  quantiy: { type: BigInt, required: true },
  is_activated: { type: Boolean, required: true, default: true },
  date: { type: Date, required: true, default: Date.now },
}, {
  timestamps: true,
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;