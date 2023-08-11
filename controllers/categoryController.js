const mongoose = require('mongoose')

const category = require('../models/category')
const product = require('../models/product')

var session;
exports.getAllData = async function (req, res) {
    session=req.session
    const categories=await category.find() 
    const products=await product.find() 
    res.render('index',{products:products,categories:categories,user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}
