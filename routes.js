const express = require("express");
var multer = require('multer');

const router = express.Router();
const registerController = require('./controllers/registerController')
const loginController = require('./controllers/loginController')
const homeController = require('./controllers/homeController')
const shopgridController = require('./controllers/shopgridController')
const shopDetailsController = require('./controllers/shopDetailsController')
const contactUsController = require('./controllers/contactUsController')
const shopingCartController = require('./controllers/shopingcartController')
const checkoutController = require('./controllers/checkoutController')
const profileController = require('./controllers/profileController')
const aboutController = require('./controllers/aboutController')
const categoryController = require('./controllers/categoryController')
const productController = require('./controllers/productController');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage }) // Define multer setup here


  router.get('/register',registerController.getRegisterData)
  router.get('/login',loginController.getLoginData)
  router.get('/',homeController.getAllData)
  router.get('/profile', profileController.getLoginData)
  router.get('/index',homeController.getAllData)
  router.get('/index/:id',homeController.getProductInfo)
  router.get("/logout",homeController.logoutUser)
  router.get("/shop-grid/:id", shopgridController.getProductInfo);
  router.get("/shop-grid/", shopgridController.getAllProducts);
  router.get("/shop-details/:id", shopDetailsController.getProductInfo);
  router.get("/contact",contactUsController.getcontactUsInfo );
  router.get("/checkout",checkoutController.getCheckoutData)
  router.get("/shoping-cart",shopingCartController.getShopingCartData)
  router.get('/addtocart/:id',shopingCartController.addToCart)
  router.get('/deleteProductFromCart/:id',shopingCartController.deleteProduct)
  router.get("/aboutus", aboutController.getLoginData)
  router.get("/category", categoryController.getLoginData)
  router.get('/product', productController.getLoginData)
  router.get('/adminhome', categoryController.getAdminData)

  

  router.post('/register',registerController.registerUser)
  router.post('/login',loginController.loginUser)
  router.post('/sendmail',contactUsController.sendEmail);
  router.post('/order',checkoutController.saveOrder);
  router.post("/savecategory",upload.single('image'), categoryController.saveCateogry)
  router.post("/saveproducts",upload.single('image'), productController.saveProducts)


module.exports = router;