

const { Router } = require('express');
const userCartHelper = require('../../models/userHelper/userCartHelper');
const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require('../../models/categoryHelper')



const addToCart = (req,res)=>{
   
    userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{  
        res.json({status:true})
          })
}





 
let cart =  async(req,res)=>{
    let userData = req.session.user;
    cartCount = await userHelper.getCartCount(req.session.user._id)
    if(req.session.loggedIn && cartCount){
      
        let products =await userHelper.getCartProducts(req.session.user._id)
        let totalAmount = await userCartHelper.getTotalAmount(req.session.user._id)
        let subTotal = await userCartHelper.subTotal(req.session.user._id)
        console.log("subtotal here :",subTotal);
          
        
        categoryHelper.getAllCategories().then((CategoryDetails) => {
            res.render('users/cart',{user:true,admin:false,userData,products,cartCount,totalAmount,CategoryDetails,subTotal})
        })
    
    }else{
        res.render("users/usersLogin", { user: false, admin: false, userData});
    }
 }







 const productCount = (req,res,next)=>{
    let userData = req.session.user
    console.log("userdata ",userData);
    userHelper.changeProductQuantity(req.body ).then(async(response)=>{
         userHelper.getTotalAmount(userData._id).then((result)=>{
            let totalAmount = result.totalAmount
            res.json({response,result})
         })
    })
 }


 const deleteCartProduct = (req,res)=>{
 
    let proId = req.query.Id
   let item = req.query.item
 console.log("item id : ",item);

    userHelper.deleteCartPro(proId).then((response)=>{
        console.log("njaningethi");
        res.redirect('/users/cart')
    })

 }



module.exports = {
    cart,
    addToCart,
    productCount,
    deleteCartProduct
}