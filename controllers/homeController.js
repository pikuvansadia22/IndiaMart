const mongoose = require('mongoose')

const category = require('../models/category')
const product = require('../models/product')

var session;
exports.getAllData = async function (req, res) {
    session = req.session
    const categories = await category.find()
    const products = await product.find({ category_id: categories[0]._id})
    res.render('index', { title_page:"index",products: products, categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.getProductInfo = async function (req, res) {
    session=req.session;
    const categories = await category.find()
    const products = await product.find({ category_id: req.params.id })
    if (products != null) {
        res.render('index', { title_page:"index",products: products, categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
    }
    else {
        res.send('Fail Data');
    }
}