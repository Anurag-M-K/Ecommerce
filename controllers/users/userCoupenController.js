const { response } = require("express");
const { COUPEN_COLLECTION } = require("../../config/collection");
const userCartHelper = require("../../models/userHelper/userCartHelper");
const userCoupenModel = require("../../models/userHelper/userCoupenModel");

const applyCoupen = async (req, res) => {
  let userData = req.session.user;
  let coupenCode = req.body.coupenCode;
  if(coupenCode){
    let totalAmount = await userCartHelper.getTotalAmount(userData._id);
    let TOTAL = totalAmount;
    let coupenDetails = await userCoupenModel.getCoupenDetails(coupenCode);
    await userCoupenModel.getDiscount(coupenDetails, TOTAL).then((response) => {
    
  
      res.json(response);
    });
  }else{
    res.json(response)
  }

};

module.exports = {
  applyCoupen,
};
