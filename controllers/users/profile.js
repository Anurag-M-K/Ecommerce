const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require('../../models/categoryHelper')
const userCartHelper = require("../../models/userHelper/userCartHelper")



const profilePage = async(req,res)=>{
    let userData = req.session.user
if(req.session.user){
    let  cartCount = await  userHelper.getCartCount(req.session.user._id)
    let products =await userCartHelper.getCartProducts(req.session.user._id)
    categoryHelper.getAllCategories().then((CategoryDetails) => {
        console.log("asdfknadhf");
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



module.exports = {
    profilePage,
    toOrder,
    toCart,
    logOutProfile
}