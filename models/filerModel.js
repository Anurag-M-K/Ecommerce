const collection = require('../config/collection')
const db = require('../config/connection')
module.exports = {
    getSalesReportDetails :(fromDate,toDate)=>{
        console.log("here mode;",fromDate,toDate);
        fromDate=new Date(fromDate).toLocaleDateString("en-US")
        toDate=new Date(toDate).toLocaleDateString("en-US")
console.log("enthoooo:",+fromDate);
console.log('11/17/2022');
date = ('11/26/2022')
         return new Promise(async(resolve,reject)=>{
            let salesOrderList  = await db.get().collection(collection.ORDER_COLLECTION).find(
                {
                  $and:[{date:{$gte:fromDate}},{date:{$lte:toDate}}]
                }).toArray()
                resolve(salesOrderList)
                console.log("order",salesOrderList);
         })
    }
}