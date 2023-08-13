const mongoose = require('mongoose')
const user = require('../models/user');

const category = require('../models/category')

var session;

exports.getLoginData = async function (req, res) {

    const categories = await category.find()

    session = req.session;
    res.render('category', {title_page:"Category", categories: categories, user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
}