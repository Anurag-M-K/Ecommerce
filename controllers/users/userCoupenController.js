const { response } = require("express");
const { COUPEN_COLLECTION } = require("../../config/collection");
const userCartHelper = require("../../models/userHelper/userCartHelper");
const userCoupenModel = require("../../models/userHelper/userCoupenModel");

const applyCoupen = async (req, res) => {
  let userData = req.session.user;
  let coupenCode = req.body.coupenCode;
  let totalAmount = await userCartHelper.getTotalAmount(userData._id);
  let TOTAL = totalAmount;
  if (coupenCode && TOTAL >= 5000) {
    let coupenDetails = await userCoupenModel.getCoupenDetails(coupenCode);
    
      await userCoupenModel
        .getDiscount(coupenDetails, TOTAL)
        .then((response) => {
          
          res.json(response);
        });
    
  } else {
    console.log("response3", response);
    res.json(response);
  }
};

module.exports = {
  applyCoupen,
};
