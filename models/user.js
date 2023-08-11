const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: BigInt, required: false },
    address_id: { type: String, required: false },
    date: { type: Date, required: true , default:Date.now},
  }, {
    timestamps: true,
})
const User=mongoose.model('User',userSchema);
module.exports=User;