const mongoose = require('mongoose')

const category = require('../models/category')
const product = require('../models/product')

var session;
exports.getAllData = async function (req, res) {
    session = req.session
    const categories = await category.find()
    const productsAll = await product.find()
    const productTopRated = await product.find().sort({no_of_reviews:'asc'})
    const productsReview = await product.find().sort({reviews:'asc'})

    const products = await product.find({ category_id: categories[0]._id})
    res.render('index', { title_page:"index",productTopRated:productTopRated,productsReview: productsReview,productsAll:productsAll,products: products, categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.getProductInfo = async function (req, res) {
    session=req.session;
    const categories = await category.find()
    const productsAll = await product.find()
    const productTopRated = await product.find().sort({no_of_reviews:'asc'})
    const productsReview = await product.find().sort({reviews:'asc'})
    const products = await product.find({ category_id: req.params.id })
    if (products != null) {
        res.render('index', { title_page:"index",productTopRated:productTopRated,productsReview: productsReview,productsAll:productsAll,products: products, categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
    }
    else {
        res.send('Fail Data');
    }
}

exports.logoutUser = async function (req, res) {
    req.session.destroy();
        res.redirect('login')
}