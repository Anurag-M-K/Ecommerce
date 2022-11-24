const db = require('../../config/connection')
const collection = require('../../config/collection')
const { resolveContent } = require('nodemailer/lib/shared')
const { response } = require('express')
const { getTotalAmount } = require('./userCartHelper')



module.exports = {
    getCoupenDetails : (coupenCode)=>{
        return new Promise(async(resolve,reject)=>{
            let coupenDetails = await db.get().collection(collection.COUPEN_COLLECTION)
            .findOne({coupenCode:coupenCode})
            resolve(coupenDetails)
          
        })
    },
    getDiscount :(coupenDetails,total)=>{
        return new Promise((resolve,reject)=>{
            if(coupenDetails){
                let discount = coupenDetails.discount
                let endDate = Date.parse(coupenDetails.endDate)
                let todayDate = new Date()
                let discountedTotal
                todayDate = todayDate.toLocaleDateString("en-US")
                todayDate = Date.parse(todayDate)

                if(todayDate<=endDate){
                    discountedTotal = total - (discount/100)*total + (5/100)*total
                 
                    response.discountedTotal = discountedTotal
                    response.coupenStatus = true
                    response.discount = discount
                    resolve(response)
                   

                }else{
                    response.coupenStatus = false
                    response.discountedTotal = total + (5/100)*total
                    response.discouont = 0
                    resolve(response)

                }


            }else{
                response.coupenStatus = false
                response.discountedTotal = total + (5/100)*total
                response.discount = 0
                resolve(response)
            }
        })
    }
}