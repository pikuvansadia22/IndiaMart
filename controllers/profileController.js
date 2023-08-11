const mongoose = require('mongoose')
const user = require('../models/user');

var session;


exports.getLoginData = async function (req, res) {
    session = req.session;
    //console.info("user login details", req.session.user )
    res.render('profile', {user_id:session.user_id,
            firstname:session.firstname,
            lastname:session.lastname,
            email:session.email
        })
}