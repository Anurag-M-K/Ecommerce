const collection = require("../../config/collection");
const { ObjectId } = require("mongodb");
const Razorpay = require("razorpay");
const db = require("../../config/connection");
const { response } = require("express");
var instance = new Razorpay({
  key_id: "rzp_test_ZzZWhbQTjsVswA",
  key_secret: "ADGRZTuXU9N2iSkZmE0dwZFX",
});

module.exports = {
  generateRazorPay: (orderId, total) => {
    return new Promise((resolve, reject) => {
      var options = {
        amount: total * 100,
        currency: "INR",
        receipt: "" + orderId,
      };
      instance.orders.create(options, function (err, order) {
        if (err) {
          console.log("errore occuring " + err);
        } else {
          resolve(order);
        }
      });
    });
  },
  verifyPayment: (details) => {
    return new Promise((resolve, reject) => {
      const crypto = require("crypto"); //kind of algoritham for creating sha256 code
      let hmac = crypto.createHmac("sha256", "ADGRZTuXU9N2iSkZmE0dwZFX");

      hmac.update(
        details.payment.razorpay_order_id +
          "|" +
          details.payment.razorpay_payment_id
      );
      hmac = hmac.digest("hex");

      if (hmac == details.payment.razorpay_signature) {
        resolve();
        console.log("resolved");
      } else {
        reject();
        console.log("rejected");
      }
    });
  },
  changePaymentStatus: (orderId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.ORDER_COLLECTION)
        .updateOne(
          { _id: ObjectId(orderId) },
          {
            $set: {
              status: "placed",
            },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },
};
