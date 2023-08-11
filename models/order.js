const mongoose=require('mongoose')
const Schema=mongoose.Schema

const orderSchema=new Schema({
    user_id: { type: String, required: true },
    cart_id: { type: Array, required: true },
    address_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: BigInt, required: true },
    ordernotes: { type: String, required: false },
    date: { type: Date, required: true , default:Date.now},
  }, {
    timestamps: true,
})
const Order=mongoose.model('Order',orderSchema);
module.exports=Order;