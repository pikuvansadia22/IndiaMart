const mongoose = require('mongoose')
const cart = require('../models/cart')
const product = require('../models/product')

var session;
exports.getShopingCartData = async function (req, res) {
  session = req.session;
  const cartdetails = await cart.find({is_activated:true })
  var productdetails = [];
  for (let i = 0; i < cartdetails.length; i++) {
    var productinfo = await product.findOne({ _id: cartdetails[i].product_id })
    if (productinfo != null) {
      productinfo.quantity = cartdetails[i].quantiy
      productdetails.push(productinfo)
    }
  }
  res.render('shoping-cart', { products: productdetails, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}



exports.addToCart = async function (req, res) {
  session = req.session;

  const cartInfo = await cart.findOne({ product_id: req.params.id, user_id: session.user_id, is_activated:true })
  if (cartInfo != null) {
    console.info("cart infro getting : " + cartInfo)
    var newQuantity = BigInt(cartInfo.quantiy + BigInt(1))
    console.info("new quantity is: " + newQuantity)
    const update = { quantiy: newQuantity };
   const newData= await cart.findByIdAndUpdate({_id:cartInfo._id}, update,{new:true})
   console.info("new data is: "+ newData)
  } else {
    var newCart = new cart({
      product_id: req.params.id,
      user_id: session.user_id,
      quantiy: 1,
    })
    newCart.save();
  }
  const cartdetails = await cart.find({ is_activated:true })
  var productdetails = [];
  for (let i = 0; i < cartdetails.length; i++) {
    var productinfo = await product.findOne({ _id: cartdetails[i].product_id })
    if (productinfo != null) {
      productinfo.quantity = cartdetails[i].quantiy
      productdetails.push(productinfo)
    }
  }
  res.render('shoping-cart', { products: productdetails, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.deleteProduct = async function (req, res) {
  session = req.session;
  const filter = { product_id: req.params.id, user_id: session.user_id, is_activated:true  };
  console.info("param info: "+filter)
  const deletedproduct = await cart.findOneAndDelete(filter).then()
  {
    console.info("deleted successfully")
  }
  const cartdetails = await cart.find({is_activated:true })
  var productdetails = [];
  for (let i = 0; i < cartdetails.length; i++) {
    var productinfo = await product.findOne({ _id: cartdetails[i].product_id })
    if (productinfo != null) {
      productinfo.quantity = cartdetails[i].quantiy
      productdetails.push(productinfo)
    }
  }
  res.render('shoping-cart', { products: productdetails, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}