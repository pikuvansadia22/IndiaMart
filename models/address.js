const mongoose=require('mongoose')
const Schema=mongoose.Schema

const addressSchema=new Schema({
    country: { type: String, required: true },
    street: { type: String, required: true },
    apartment: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    date: { type: Date, required: true , default:Date.now},
  }, {
    timestamps: true,
})
const Address=mongoose.model('Address',addressSchema);
module.exports=Address;