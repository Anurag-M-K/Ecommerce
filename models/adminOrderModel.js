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
    },
    getOrderStatusCount : ()=>{
        return new Promise(async(resolve,reject)=>{
            let status = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $group:{
                        _id:{status:'$deliveryDetails.status'},
                        count:{$count:{}}
                    }
                },
                {
                    $project:{
                        '_id.status':1,
                        count:1
                    }
                }
            ]).toArray()
            resolve(status)
        })

    },
    updateOrderDetails :(data)=>{
  
    return new Promise((resolve,reject)=>{
        let orderId = data.id
        let status = data.status
       
        db.get().collection(collection.ORDER_COLLECTION).updateOne(
            {
                _id:objectId(orderId)
            },
            {
                $set:{
                    status:status
                }
            }
        ).then((response)=>{
            resolve(response)
        })
    })
    }

}

