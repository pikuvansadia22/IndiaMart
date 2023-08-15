const mongoose=require('mongoose')
const Schema=mongoose.Schema

const categorySchema=new Schema({
    name: { type: String, required: true },
    image:     {
        data: Buffer,
        contentType: String
    },
  });
const Category=mongoose.model('Category',categorySchema);
module.exports=Category;