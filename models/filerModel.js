const collection = require('../config/collection')
const db = require('../config/connection')
module.exports = {
    getSalesReportDetails :(fromDate,toDate)=>{
        fromDate=new Date(fromDate).toLocaleDateString("en-US")
        toDate=new Date(toDate).toLocaleDateString("en-US")
date = ('11/26/2022')
         return new Promise(async(resolve,reject)=>{
            let salesOrderList  = await db.get().collection(collection.ORDER_COLLECTION).find(
                {
                  $and:[{date:{$gte:fromDate}},{date:{$lte:toDate}}]
                }).toArray()
                resolve(salesOrderList)
         })
    }
}