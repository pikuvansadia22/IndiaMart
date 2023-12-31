const mongoose = require('mongoose')
const cart = require('../models/cart')
const product = require('../models/product')
const address = require('../models/address')
const order = require('../models/order')
const user = require('../models/user')


var session,cartdetails;
var productdetails = [];
exports.getCheckoutData = async function (req, res) {
  session = req.session;
  productdetails = [];
 cartdetails = await cart.find({is_activated:true })
  for (let i = 0; i < cartdetails.length; i++) {
    var productinfo = await product.findOne({ _id: cartdetails[i].product_id })
    if (productinfo != null) {
      productinfo.quantity = cartdetails[i].quantiy
      productdetails.push(productinfo)
    }
  }
  res.render('checkout', {title_page:"checkout", products: productdetails, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.saveOrder = async function (req, res) {
  var address_id=await saveAddress(req,res)
  console.info("address id is: "+ address_id);
  var newOrder=new order({
    user_id: session.user_id,
    cart_id: cartdetails,
    address_id: address_id,
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email:req.body.email,
    phone: req.body.phone,
    ordernotes: req.body.ordernotes,
  })
newOrder.save().then()
  {
    updateUser(req,res,address_id)
    deactivateCart(req,res)
    res.send("<h1> Your order placed successfully.. you will be redirecting to home screen soon"+
    "<script> setTimeout(function(){  window.location.href = '/index';}, 2000);</script> </h1>")
  }
}

saveAddress = async function (req, res) {
  var add_id="";
  var newAddress = new address({
    country: req.body.country,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
  })
  newAddress.save().then()
  {
    console.info("address save successfully")
  }
  const addresses=await address.findOne({street:req.body.street,zipcode:req.body.zipcode})
  console.info("address data is :" + addresses)
  return addresses._id;
}
  updateUser=async function(req,res,address_id)
  {
    filter={_id:session.user_id}
    update={phone:req.body.phone,address_id:address_id}
    user.findOneAndUpdate(filter, update).then()
    {
      console.info("user information updated successfully")
    }

  }

  deactivateCart=function(req,res)
  {
    cartdetails.forEach(element => {
     cart.findOneAndUpdate({_id:element._id},{is_activated:false}).then()
     {
      console.info("cart updated successfully")
     }
    });
  }
