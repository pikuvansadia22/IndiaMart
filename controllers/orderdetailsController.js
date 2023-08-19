const mongoose = require('mongoose')
const cart = require('../models/cart')
const product = require('../models/product')
const order = require('../models/order')


var session;

exports.getOrderDetails = async function (req, res) {
  session = req.session;
  const orders=await order.findOne({_id:req.params.id})
  var cartdetails =[]
  for(var i=0;i<orders.cart_id.length;i++)
  {
    var carts= await cart.findOne({_id:orders.cart_id[i]._id})
    cartdetails.push(carts)
  }
  var productdetails = [];
  for (let i = 0; i < cartdetails.length; i++) {
    var productinfo = await product.findOne({ _id: cartdetails[i].product_id })
    if (productinfo != null) {
      productinfo.quantity = cartdetails[i].quantiy
      productdetails.push(productinfo)
    }
  }
  console.info("product data: "+productdetails)
  res.render('orderdetails', { title_page:"orderdetails",products: productdetails, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}