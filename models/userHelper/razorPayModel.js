
const Razorpay = require('razorpay')
var instance = new Razorpay({
    key_id : 'rzp_test_ZzZWhbQTjsVswA',
    key_secret : 'ADGRZTuXU9N2iSkZmE0dwZFX',
})


module.exports = {
    generateRazorPay:(orderId,total)=>{
        return new Promise((resolve,reject)=>{
            var options = {
                amount: total,
                currency: "INR",
                receipt:  ''+orderId
            }
            instance.orders.create(options, function (err, order) {
                console.log("razorpay check");
                if (err) {
                    console.log(err);
                } else {
                    console.log("New Order:", order);
                    resolve(order)
                }
            })
        })
    }
}