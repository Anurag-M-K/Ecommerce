const { response } = require("express");
const userCartHelper = require("../../models/userHelper/userCartHelper");
const userCoupenModel = require('../../models/userHelper/userCoupenModel')


const applyCoupen = async(req,res)=>{
    let userData = req.session.user;
    let coupenCode = req.body.code
    console.log("coupenCode : ",coupenCode);
    let totalAmount = await userCartHelper.getTotalAmount(userData._id)

        console.log("coupe  total :",TOTAL);
   totalAmount = totalAmount.totalAmount
   
userCoupenModel.applyCoupen(coupenCode,totalAmount).then((response)=>{
    res.send(response)
})

}


module.exports = {
    applyCoupen
}