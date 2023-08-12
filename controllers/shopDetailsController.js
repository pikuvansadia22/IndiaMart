const mongoose = require('mongoose')

const product = require('../models/product')

const category = require('../models/category')
var session;

exports.getProductInfo = async function (req, res) {
    session=req.session;
    const productInfo = await product.findOne({ _id : req.params.id })
    const categoryInfo=await category.findOne({ _id : productInfo.category_id})
    if(productInfo!=null)
    {
        res.render('shop-details',{title_page:"shop-details",product:productInfo,category:categoryInfo,user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email })
    }
    else
    {
        res.send('Fail Data');
    }
   
}

