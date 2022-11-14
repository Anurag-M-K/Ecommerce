

const { Router } = require('express');
const userCartHelper = require('../../models/userHelper/userCartHelper');
const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require('../../models/categoryHelper')



const addToCart = (req,res)=>{
   
    userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{  
        res.json({status:true})
          })
}





const cart =  async(req,res)=>{
  
    let userData = req.session.user;
    if(req.session.loggedIn){
      
        let products =await userHelper.getCartProducts(req.session.user._id)
   
    
        let totalAmount = await userCartHelper.getTotalAmount(req.session.user._id)
      
       
       
       
          cartCount = await userHelper.getCartCount(req.session.user._id)
        categoryHelper.getAllCategories().then((CategoryDetails) => {

            res.render('users/cart',{user:true,admin:false,userData,products,cartCount,totalAmount,CategoryDetails})
        })
     
       
           
     
    }else{
        res.render("users/usersLogin", { user: false, admin: false, userData});
    }
    
 }


 const productCount = (req,res,next)=>{
    let userData = req.session.user
    userHelper.changeProductQuantity(req.body ).then(async(response)=>{
         userHelper.getTotalAmount(userData._id).then((result)=>{
           
            let totalAmount = result.totalAmount
          
            res.json({response,result})
         })
     
       
    })
 }




module.exports = {
    cart,
    addToCart,
    productCount
}