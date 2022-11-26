const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require("../../models/categoryHelper")
const razorPayModel = require('../../models/userHelper/razorPayModel')
const userCoupenModel = require('../../models/userHelper/userCoupenModel')
const userAddressHelper = require('../../models/helpers/user-helper')

const showCheckoutPage = (req,res)=>{
    let userData = req.session.user
   
    res.render('users/checkOut',{user:true,admin:false,userData})
}


const   payment = async (req,res)=>{
    let userData = req.session.user 
    let totalAmount=req.query.finalTotal
    

    if(req.session.user){
    
       let addressList = await userAddressHelper.getAddress(req.session.user._id)
       if(addressList){
        let products = await userHelper.getCartProducts(req.session.user._id)
        let  cartCount = await  userHelper.getCartCount(req.session.user._id)
        categoryHelper.getAllCategories().then((CategoryDetails) => {
            res.render('users/addressPayment',{user:true,admin:false,userData,cartCount,products,totalAmount,CategoryDetails,addressList})
        })

       }else{
        res.redirect('/addressaddPage')
       }
     
     
        
    }
    }
    //her razorepay working
   
const checkOut = async(req,res)=>{
  
    let totalPrice = await userHelper.getTotalAmount(req.body.userId)
    
   let finalPrice= totalPrice - req.body.discountedTotal 

    if(totalPrice >0)
   userHelper.placeOrder(req.body,totalPrice,req.body.userId).then((orderId)=>{
    orderId = orderId.insertedId
  
  
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

   

    razorPayModel.verifyPayment(req.body).then(()=>{ 
      
        razorPayModel.changePaymentStatus(req.body.order.receipt).then(()=>{
          
          
            res.json({status:true})
        })

    }).catch((err)=>{
       
        res.json({status:false})
    })
}





const checkingOutPage = async(req,res)=>{
    let finalTotal = (req.body.totalAmount)
  
    let details = req.body
    details.finalTotal = parseInt(details.totalAmount)
    if(details.coupenCode===''){
    
        let shippingCharge = (5/100)*details.totalAmount
        finalTotal = parseInt(details.totalAmount) + shippingCharge
      
   
        res.json(finalTotal)
    }else{
        let coupenDetails = await userCoupenModel.getCoupenDetails(details.coupenCode)
        if(coupenDetails){
            await userCoupenModel.getDiscount(coupenDetails,details.totalAmount).then((response)=>{
                finalTotal = response.discountedTotal
                finalTotal = Math.round(finalTotal)
                res.json(finalTotal)
            })
        }else{
            let shippingCharge = (5/100)*details.finalTotal
            finalTotal = details.totalAmount + shippingCharge
            res.json(finalTotal)

        }
    }
}

module.exports = {
    showCheckoutPage,
    payment,
    checkOut,
    verifyingPayment,
    checkingOutPage
   
    

}