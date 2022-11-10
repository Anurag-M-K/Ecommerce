const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require("../../models/categoryHelper")

const checkoutPage = (req,res)=>{
    let userData = req.session.user
   
    res.render('users/checkOut',{user:true,admin:false,userData})
}


const   payment = async (req,res)=>{
    let userData = req.session.user 

    if(req.session.user){
        let totalAmount = await userHelper.getTotalAmount(req.session.user._id)
       
        let products = userHelper.getCartProducts(req.session.user._id)
            let  cartCount =  userHelper.getCartCount(req.session.user._id)
            categoryHelper.getAllCategories().then((CategoryDetails) => {
                res.render('users/addressPayment',{user:true,admin:false,userData,cartCount,products,totalAmount,CategoryDetails})
            })
        
    }
    }
   
const checkOut = async(req,res)=>{
    let products = await userHelper.getCartProductList(req.body.userId)
    let totalPrice = await userHelper.getTotalAmount(req.body.userId)
  
   userHelper.placeOrder(req.body,req.body.userId,totalPrice,products).then((response)=>{
    console.log("products",products);
    console.log("PRICE",totalPrice);
    res.json({status:true})
   })
   
    console.log(req.body)









    
}

module.exports = {
    checkoutPage,
    payment,
    checkOut
}