const mongoose=require('mongoose')
const Schema=mongoose.Schema

const contactUsSchema=new Schema({
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  time: { type: String, required: true },
  })
const Conatct=mongoose.model('Conatct',contactUsSchema);
module.exports=Conatct;