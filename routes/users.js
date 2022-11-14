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
const userOrderHelper = require('../models/userHelper/userOrderHelper')
const order = require('../controllers/users/order');
const razorPayModel = require('../models/userHelper/razorPayModel');
const profile = require('../controllers/users/profile')

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
router.delete('/removeCartProduct')

//wishlist
router.get('/add-to-wishlist/:id',)





//checkout
router.get('/users/checkOut',userCheckOut.checkoutPage)
router.post('/place-order',userCheckOut.checkOut)

//category based page
router.get('/categoryBasedPage',categoryBasedPage.categoryBased)

//single page
router.get('/users/singlePage',userSinglePage.single)


//nav buttonsu
router.get('/homeButton',navButtons.homeButton)

//plceorder
router.get('/placeOrder',userCheckOut.payment)
router.get('/orderPlaced',usersOrderList.orderSuccess)
router.get('/view-order-products',order.viewOrderProducts)


//orderlist
router.get('/orderList',usersOrderList.orderList)

//payment
router.post('/verify-payment',userCheckOut.verifyingPayment)


//prpofile
router.get('/users/profile',profile.profilePage)
router.get('/toOrder',profile.toOrder)
router.get('/toCart',profile.toCart)
router.get('/logoutFromProfile',profile.logOutProfile)






module.exports=router