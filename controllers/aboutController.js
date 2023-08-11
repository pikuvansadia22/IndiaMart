const mongoose = require('mongoose')
const user = require('../models/user');

var session;

exports.getLoginData = async function (req, res) {
    session = req.session;
    res.render('aboutus', {user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}