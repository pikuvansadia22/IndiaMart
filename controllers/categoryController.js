const mongoose = require('mongoose')
const category = require('../models/category')
var path = require('path');
var multer = require('multer');
var fs = require('fs');


var session;

exports.getAdminData = async function (req, res) {
  const categories = await category.find()
  session = req.session;
  res.render('adminhome', { title_page: "Category", categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.getLoginData = async function (req, res) {
  session = req.session;
  res.render('category', { title_page: "Category",categories: null, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.getCategoryById = async function (req, res) {
  const categories = await category.findOne({_id:req.params.id})
  session = req.session;
  res.render('category', { title_page: "Category", categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.getViewCategory = async function (req, res) {

  const categories = await category.find()
  session = req.session;
  res.render('viewcategories', { title_page: "Category", categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}

exports.updateCateogry = async function (req, res) {
  var update;
  if (!req.file) {
    console.log("file not uploaded")
    update={name:req.body.name}
  }
  else
  {
    update={name:req.body.name,image: {data: fs.readFileSync(req.file.path),contentType: 'image/png'}}
  }
  const filter={_id:req.body.id}
  const categories = await category.findOneAndUpdate(filter,update).then(cat=>
    {
    console.info("success")
    }
  ).catch(err=>
    {
      res.send(err)
    }
  )
  session = req.session;
  res.redirect('viewcategories')
}

exports.deleteCategory = async function (req, res) {
  const categori = await category.findOneAndDelete({_id:req.params.id}).then(
    console.log("deleted successfully")
  )
  const categories = await category.find()
  session = req.session;
  res.render('viewcategories', { title_page: "Category", categories: categories, user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
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
    res.redirect('viewcategories')
  })).catch((err => {
    res.status(500).json({
      error: err,
      success: false
    });
  })
  )
}



