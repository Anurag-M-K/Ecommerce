const userAddressHelper = require('../../models/helpers/user-helper')
const userHelper = require('../../models/userHelper/userCartHelper')

const categoryHelper = require('../../models/categoryHelper')
const userCartHelper = require("../../models/userHelper/userCartHelper")
const userProfileModel = require('../../models/helpers/user-helper')
const { response } = require('express')


const profilePage = async(req,res)=>{
    let userData = req.session.user
if(req.session.user){
    let  cartCount = await  userHelper.getCartCount(req.session.user._id)
    let products =await userCartHelper.getCartProducts(req.session.user._id)
    categoryHelper.getAllCategories().then((CategoryDetails) => {
    res.render('users/userProfile' ,{user:true,admin:false,userData,CategoryDetails,cartCount,products})
    })
}else{
    res.redirect('/usersLogin')
}

}



const toOrder = (req,res)=>{
    res.redirect('/orderList')
}


const toCart = (req,res)=>{
    res.redirect('/users/cart')
}


const logOutProfile = (req,res)=>{
    res.redirect('/logout')
}

const toWishlist =  (req,res)=>{
    res.redirect('/users/wishList')
}

const edtitProfile = async(req,res)=>{
    let userData = req.session.user
 
   

    let  cartCount = await  userHelper.getCartCount(req.session.user._id)
    let products =await userCartHelper.getCartProducts(req.session.user._id)
    categoryHelper.getAllCategories().then((CategoryDetails) => {
        res.render('users/editProfile',{user:false,admin:false,cartCount,products,CategoryDetails})
    })
 
}

const updateProfile = (req,res)=>{
    userProfileModel.updateUserDetails(req.session.user, req.body).then(()=>{
        res.redirect('/')
    })
}


const address =  async(req,res)=>{
    let userData = req.session.user
 
   

    let  cartCount = await  userHelper.getCartCount(req.session.user._id)
    let products =await userCartHelper.getCartProducts(req.session.user._id)
    categoryHelper.getAllCategories().then((CategoryDetails) => {
    res.render('users/addressAddPage',{user:true,admin:false,userData,cartCount,products,CategoryDetails})
    })
}

const addressAdd = (req,res)=>{
    console.log("req.body",req.body);
    let userData = req.session.user._id
    userAddressHelper.addAddress(req.body,userData).then((response)=>{
       res.redirect('/')
    })
}


module.exports = {
    profilePage,
    toOrder,
    toCart,
    logOutProfile,
    toWishlist,
    edtitProfile,
    updateProfile,
    address,
    addressAdd
}