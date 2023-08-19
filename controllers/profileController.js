const mongoose = require('mongoose')
const user = require('../models/user');
const address = require('../models/address');
const product = require('../models/product');
const order = require('../models/order');
const cart = require('../models/cart');

var session;

exports.getLoginData = async function (req, res) {
    session = req.session;
    const user_=await user.findById({_id:session.user_id})
   console.info("user address is : " )
   if(user_.address_id===undefined || user_.address_id==null)
   {
    res.render('profile', {title_page:"profile",orders:null,address:null,user:user_,user_id:session.user_id,
    firstname:session.firstname,
    lastname:session.lastname,
    email:session.email
})
   }
   else{
    const orders = await order.find({user_id:user_._id})
    console.log("orders",orders)
  
    const address_=await address.findById({_id:user_.address_id})
    //console.info("user login details", req.session.user )
    res.render('profile', {title_page:"profile",orders:orders,address:address_,user:user_,user_id:session.user_id,
            firstname:session.firstname,
            lastname:session.lastname,
            email:session.email
        })
    }
}