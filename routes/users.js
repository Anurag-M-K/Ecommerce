const express = require('express')
const router = express.Router();
const usersController = require('../controllers/users/usersController')
const userDoLogin = require('../models/helpers/user-helper')
const nodemailer = require("nodemailer")
const userCart = require('../controllers/users/userCart')
const userCheckOut = require('../controllers/users/userCheckOut')
const userSinglePage = require('../controllers/users/userSinglePage')
const navButtons = require('../controllers/users/navButtons')
const categoryBasedPage = require("../controllers/users/categoryBasedPage")
const usersOrderList = require("../controllers/users/usersOrderList")




const verifyLogin = (req,res,next)=>{
    if(req.session.loggedIn){
        next()
    }else{
        res.redirect("/userslogin")
    }
}


router.get("/", usersController.userHomePage);
router.post('/login',usersController.userSessionController)

router.get('/userslogin',usersController.userLogin)
// router.get('/',usersController.usersLog)
router.post('/signup',usersController.userSignup)
router.get("/header/usersignup",usersController.signupFromHome)

router.post('/signup',usersController.userSignupBcrypt)
router.get('/logout',usersController.logout)
router.post('/checkOtp',usersController.checkOtp)



//cart
router.get('/add-to-cart/:id',userCart.addToCart)
router.get('/users/cart',userCart.cart)
router.post('/change-product-quantity',userCart.productCount)



//checkout
router.get('/users/checkOut',userCheckOut.checkoutPage)
router.post('/place-order',userCheckOut.checkOut)



//single page
router.get('/users/singlePage',userSinglePage.single)


//nav buttonsu
router.get('/homeButton',navButtons.homeButton)

//plceorder
router.get('/placeOrder',userCheckOut.payment)
router.get('/orderPlaced',usersOrderList.orderSuccess)



//category based page
router.get('/categoryBasedPage',categoryBasedPage.categoryBased)





module.exports=router