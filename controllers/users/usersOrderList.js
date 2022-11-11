const categoryHelper = require("../../models/categoryHelper")
const userCartHelper = require("../../models/userHelper/userCartHelper")
const userOrderHelper = require('../../models/userHelper/userOrderHelper')

const orderSuccess = async(req,res)=>{
   let userData = req.session.user
   if(req.session.loggedIn){
      
    let products =await userCartHelper.getCartProducts(req.session.user._id)
   
    cartCount = await userCartHelper.getCartCount(req.session.user._id)
   
    let totalAmount = await userCartHelper.getTotalAmount(req.session.user._id)
   
    categoryHelper.getAllCategories().then((CategoryDetails) => {
res.render('users/orderPlaced',{user:true,admin:false,products,cartCount,totalAmount,userData,CategoryDetails})


}

  ) }


}




const orderList = async (req,res)=>{

  let userData = req.session.user
  let cartCount = null;
  if (req.session.userLoggedIn) {
      cartCount = await userCartHelper.getCartCount(req.session.user._id)
  }
  let products =await userCartHelper.getCartProducts(req.session.user._id)
 
 
  let productList =await userOrderHelper.getUserOrders(req.session.user._id)
  let totalAmount = await userCartHelper.getTotalAmount(req.session.user._id)
           

  let paymentMethod= await userCartHelper.getPaymentMethod(req.session.user._id)

  categoryHelper.getAllCategories().then((CategoryDetails) => {


      res.render("users/orderList",{
        user:true,
        admin:false,
        productList,
        totalAmount,
        userData,
        products,
        cartCount,
        CategoryDetails
       
      })
    })
 
  }










module.exports = {
    orderSuccess,
    orderList
}