const categoryHelper = require("../../models/categoryHelper")
const userCartHelper = require("../../models/userHelper/userCartHelper")

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











module.exports = {
    orderSuccess
}