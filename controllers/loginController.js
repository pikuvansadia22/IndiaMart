const mongoose = require('mongoose')
const user = require('../models/user');

var session;

exports.loginUser = async function (req, res) {
    const loginUser = await user.findOne({ email: req.body.email, password: req.body.password }).lean()
    if (loginUser != null) {
        session = req.session;
        session.user_id = loginUser._id
        session.firstname = loginUser.firstname
        session.lastname = loginUser.lastname
        session.email = loginUser.email
        if (loginUser.email != "admin@yopmail.com")
            res.redirect('index')
        else
            res.redirect('category')
    }
    else {
        res.send('Invalid username or password');
    }

}

exports.getLoginData = async function (req, res) {
    session = req.session;
    res.render('login', { title_page: "login", user_id: session.user_id, firstname: session.firstname, lastname: session.lastname, email: session.email })
}


