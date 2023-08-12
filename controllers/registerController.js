const mongoose=require('mongoose')

const user=require('../models/user')
var session;

exports.registerUser = function (req, res) {
  var newUser = new user({

    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date
  })

  newUser.save().then((createdUser => {
    //res.status(201).json(createdUser)
    res.redirect('login')
  })).catch((err => {
    res.status(500).json({
      error: err,
      success: false
    });
  })
  )
}
exports.getRegisterData = async function (req, res) {
  session = req.session;
  res.render('register', {title_page:"register",user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}