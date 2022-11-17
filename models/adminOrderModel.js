const collection = require('../config/collection')
var db = require('../config/connection')
const { loginview } = require('../controllers/admin/adloginController')
var objectId = require('mongodb').ObjectId


module.exports = {
    getOrders:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderList = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
           
       
            if(orderList.length>0){
                let user = await db.get().collection(collection.ORDER_COLLECTION
                    ).aggregate([
                    {
                        $lookup:{
                            from:collection.USER_COLLECTION,
                            localField:"Name",
                            foreignField:"_id",
                            as:"userDetails"

                        }
                    }
                ]).toArray()
                resolve(user)
               
            }else{
                console.log("empty");
                resolve({ordersEmpty:true})
            }
        })
    },
    getAllOrderedPoducts :(proId)=>{

    
        return new Promise(async(resolve,reject)=>{
         let orderProducts = await   db.get().collection(collection.ORDER_COLLECTION).aggregate([
               
                {
                    $match:{_id:objectId(proId)}
                },
                {
                    $lookup:{
                        from:collection.USER_COLLECTION,
                        localField:"Name",
                        foreignField:"_id",
                        as:'userDetails'
                    }
                },
                {
                    $unwind:'$deliveryDetails.products'
                },
                {
                    $unwind :'$deliveryDetails.TotalAmount'
                }
            ]).toArray()
            resolve(orderProducts)
          
        
        })
    }

}

