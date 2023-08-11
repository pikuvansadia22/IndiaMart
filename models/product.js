const mongoose=require('mongoose')
const Schema=mongoose.Schema

const productSchema=new Schema({
  availability: { type: String, required: true },
    description: { type: String, required: true },
    information: { type: String, required: true },
    name: { type: String, required: true },
    no_of_reviews: { type: BigInt, required: true },
    price: { type: String, required: true },
    reviews: { type: Number, required: true },
    nashipping_daysme: { type: BigInt, required: true },
    weight: { type: Number, required: true },
    category_id: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: BigInt },
  })

const Product=mongoose.model('Product',productSchema);
module.exports=Product;