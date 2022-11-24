const userCartHelper = require("../../models/userHelper/userCartHelper")
const userOrderHelper = require("../../models/userHelper/userOrderHelper")
const categoryHelper = require('../../models/categoryHelper')
const userHelper = require('../../models/userHelper/userCartHelper')

const viewOrderProducts = async(req,res)=>{
    let id = req.query
  
    let userData = req.session.user
    let cartCount = null;
    if (req.session.userLoggedIn) {
        cartCount = await userCartHelper.getCartCount(req.session.user._id)
    }
    let products =await userCartHelper.getCartProducts(req.session.user._id)
   
   
  
    let totalAmount = await userCartHelper.getTotalAmount(req.session.user._id)
       
    categoryHelper.getAllCategories().then(async(CategoryDetails) => {
     userOrderHelper.getOneOrderProduct(id).then((orderList)=>{
       

       
         res.render('users/view-order-products',{user:true,admin:false,orderList,userData,cartCount,totalAmount,products,CategoryDetails})
    })

   
    })
}

module.exports = {
 
    viewOrderProducts
}