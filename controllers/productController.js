const mongoose = require('mongoose')
const user = require('../models/user');

const category = require('../models/category')
const product = require('../models/product')

var session;

exports.getLoginData = async function (req, res) {
    
    const categories = await category.find()
    const products = await product.find({ category_id: categories[0]._id})

    session = req.session;
    res.render('product', {title_page:"Product", products: products, categories: categories, user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}