const mongoose = require('mongoose')
const user = require('../models/user');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
const category = require('../models/category')
const product = require('../models/product')

var session;

exports.getLoginData = async function (req, res) {
  const categories = await category.find({})
    session = req.session;
    res.render('product', {title_page:"Product", products: null, categories: categories, user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}

exports.getProductById = async function (req, res) {
  const categories = await category.find({})
  const products = await product.findOne({_id:req.params.id})
  session = req.session;
  res.render('product', {title_page:"Product", products: products, categories: categories, user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}


exports.getViewProducts = async function (req, res) {
  const categories = await category.find({})
  const products = await product.find({ })
  session = req.session;
  res.render('viewproducts', {title_page:"Product", products: products, categories: categories, user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}


exports.deleteProduct = async function (req, res) {
  const categories = await category.find({})
  const produc = await product.findOneAndDelete({_id:req.params.id}).then(
    console.log("deleted successfully")
  )
  const products = await product.find({ })

  session = req.session;
  res.render('viewproducts', {title_page:"Product", products: products, categories: categories, user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}

exports.updateProduct = async function (req, res) {
  var update;
  if (!req.file) {
    console.log("file not uploaded")
    update={availability:req.body.availability,
      description:req.body.description,
      information:req.body.information,
      name:req.body.name,
      no_of_reviews:req.body.no_of_reviews,
      price:req.body.price,
      reviews:req.body.reviews,
      shipping_days:req.body.shipping_days,
      weight:req.body.weight,
      category_id:req.body.category,}
  }
  else
  {
    update={ availability:req.body.availability,
      description:req.body.description,
      information:req.body.information,
      name:req.body.name,
      no_of_reviews:req.body.no_of_reviews,
      price:req.body.price,
      reviews:req.body.reviews,
      shipping_days:req.body.shipping_days,
      weight:req.body.weight,
      category_id:req.body.category,
      image: {
        data: fs.readFileSync(req.file.path),
        contentType: 'image/png'
      }}
  }
  const filter={_id:req.body.id}
  const products = await product.findOneAndUpdate(filter,update)
  session = req.session;
  res.redirect('viewproducts')
}


exports.saveProducts = function (req, res) {
  if (!req.file) {
    console.log("file not uploaded products")
  }
    var newProducts = new product({
        availability:req.body.availability,
        description:req.body.description,
        information:req.body.information,
        name:req.body.name,
        no_of_reviews:req.body.no_of_reviews,
        price:req.body.price,
        reviews:req.body.reviews,
        shipping_days:req.body.shipping_days,
        weight:req.body.weight,
        category_id:req.body.category,
        image: {
          data: fs.readFileSync(req.file.path),
          contentType: 'image/png'
        }
    })
  
    newProducts.save().then((createdProducts => {
      //res.status(201).json(createdUser)
      res.redirect('viewproducts')
    })).catch((err => {
      res.status(500).json({
        error: err,
        success: false
      });
    })
    )
  }