const mongoose = require('mongoose')

const product = require('../models/product')
var session;
exports.getProductInfo = async function (req, res) {
    session=req.session;
    const productInfo = await product.find({ category_id: req.params.id })
    if (productInfo != null) {
        res.render('shop-grid', {title_page:"shop-grid", products: productInfo,user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email})
    }
    else {
        res.send('Fail Data');
    }

}
exports.getAllProducts = async function (req, res) {
    session=req.session;
    const productInfo = await product.find({ })
    if (productInfo != null) {
        res.render('shop-grid', {title_page:"shop-grid", products: productInfo,user_id:session.user_id,firstname:session.firstname,lastname:session.lastname,email:session.email })
    }
    else {
        res.send('Fail Data');
    }
}

