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
    const products = await product.find({ })

    session = req.session;
    res.render('product', {title_page:"Product", products: products, categories: categories, user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
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
      res.redirect('product')
    })).catch((err => {
      res.status(500).json({
        error: err,
        success: false
      });
    })
    )
  }