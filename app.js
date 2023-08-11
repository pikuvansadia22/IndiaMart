const express=require('express')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var bodyParser = require('body-parser');
const expressLayouts=require('express-ejs-layouts')
var path = require('path')
const routes=require('./routes')
const mongoose=require('mongoose')
require("dotenv").config()
 const nodemailer = require("nodemailer");
 const { google } = require("googleapis");
 const OAuth2 = google.auth.OAuth2;

const { initiateDbConnection } = require('./db')

const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts)
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecret1234567890",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.listen(3000, () => {
    console.info('Server is up and running on PORT: 3000');
})

// connect to db
initiateDbConnection()

app.use('/',routes)
module.exports = app