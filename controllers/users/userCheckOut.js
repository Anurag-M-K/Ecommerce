const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require("../../models/categoryHelper")
const razorPayModel = require('../../models/userHelper/razorPayModel')

const checkoutPage = (req,res)=>{
    let userData = req.session.user
   
    res.render('users/checkOut',{user:true,admin:false,userData})
}


const   payment = async (req,res)=>{
    let userData = req.session.user 

    if(req.session.user){
        let totalAmount = await userHelper.getTotalAmount(req.session.user._id)
       
        let products = await userHelper.getCartProducts(req.session.user._id)
            let  cartCount = await  userHelper.getCartCount(req.session.user._id)
            categoryHelper.getAllCategories().then((CategoryDetails) => {
                res.render('users/addressPayment',{user:true,admin:false,userData,cartCount,products,totalAmount,CategoryDetails})
            })
        
    }
    }
   
const checkOut = async(req,res)=>{
    let products = await userHelper.getCartProductList(req.body.userId)
    let totalPrice = await userHelper.getTotalAmount(req.body.userId)
   userHelper.placeOrder(req.body,totalPrice,req.body.userId).then((orderId)=>{
   console.log(req.body);
    if(req.body['payment-method']==='COD'){
        res.json({codSuccess:true})
    }else{
        razorPayModel.generateRazorPay(orderId,totalPrice).then((response)=>{
           res.json(response)
        })
    }
   
   })

   
}


const verifyingPayment = (req,res)=>{
    console.log("checkcing body ",req.body);
   

    razorPayModel.verifyPayment(req.body).then(()=>{ 
      
        razorPayModel.changePaymentStatus(req.body.order.receipt).then(()=>{
          
            console.log('payment successfull');
            res.json({status:true})
        })

    }).catch((err)=>{
       
        res.json({status:false})
    })
}







module.exports = {
    checkoutPage,
    payment,
    checkOut,
    verifyingPayment
   

}