const mongoose = require('mongoose')
const user = require('../models/user');
const address = require('../models/address');

var session;

exports.getLoginData = async function (req, res) {
    session = req.session;
    const user_=await user.findById({_id:session.user_id})
   console.info("user address is : "+user.address_id)
   if(user.address_id===undefined && user.address_id==null)
   {
    res.render('profile', {title_page:"profile",address:null,user:user_,user_id:session.user_id,
    firstname:session.firstname,
    lastname:session.lastname,
    email:session.email
})
   }
   else{
    const address_=await address.findById({_id:user_.address_id})
    //console.info("user login details", req.session.user )
    res.render('profile', {title_page:"profile",address:address_,user:user_,user_id:session.user_id,
            firstname:session.firstname,
            lastname:session.lastname,
            email:session.email
        })
    }
}