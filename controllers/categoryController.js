const mongoose = require('mongoose')
const category = require('../models/category')
var path = require('path');
var multer = require('multer');
var fs = require('fs');


var session;

exports.getLoginData = async function (req, res) {

  const categories = await category.find()
  session = req.session;
  res.render('category', { title_page: "Category", categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.saveCateogry = function (req, res) {

  if (!req.file) {
    console.log("file not uploaded")
  }
  var newCategory = new category({
    name: req.body.name,
    image: {
      data: fs.readFileSync(req.file.path),
      contentType: 'image/png'
    }
  })

  newCategory.save().then((createdCategory => {
    //res.status(201).json(createdUser)
    res.redirect('category')
  })).catch((err => {
    res.status(500).json({
      error: err,
      success: false
    });
  })
  )
}



