const userCartHelper = require("../../models/userHelper/userCartHelper")
const userOrderHelper = require("../../models/userHelper/userOrderHelper")
const categoryHelper = require('../../models/categoryHelper')
const userHelper = require('../../models/userHelper/userCartHelper')

const viewOrderProducts = async(req,res)=>{
    
    let userData = req.session.user
    cartCount = await userHelper.getCartCount(req.session.user._id)
 
   
      
        let products =await userHelper.getCartProducts(req.session.user._id)
       
        cartCount = await userHelper.getCartCount(req.session.user._id)
       
        let totalAmount = await userCartHelper.getTotalAmount(req.session.user._id)
       
    categoryHelper.getAllCategories().then(async(CategoryDetails) => {
    let orderItem = await userOrderHelper.getOrderProducts(req.query.id)
    console.log('orderitem :',orderItem);
    res.render('users/view-order-products',{user:true,admin:false,orderItem,userData,cartCount,totalAmount,products,CategoryDetails})
    })
}

module.exports = {
 
    viewOrderProducts
}