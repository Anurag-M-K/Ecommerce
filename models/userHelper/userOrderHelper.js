const ObjectId = require('mongodb').ObjectID
const { response } = require('express')
const collection = require("../../config/collection")
const db = require("../../config/connection")



module.exports = {
    
     getUserOrders : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            let productList = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
         
            
            
            resolve(productList)
          
          
            
        })
    },
    getOrderProducts : (orderId)=>{
        return new Promise(async(resolve,reject)=>{
          

            let orderItem = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match:{_id:ObjectId(orderId)}
                },
                {
                    $unwind:'$products'
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTION,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },
                {
                    $project:{
                        item:1,
                        quantity:1,
                        product:{$arrayElemAt:['$product',0]}
                    }
                }
            ]).toArray()
           
            resolve(orderItem)
            console.log('loging',orderItem);
        })
    }
}