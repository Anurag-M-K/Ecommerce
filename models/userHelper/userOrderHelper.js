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
                }
         
            ]).toArray()
           
            resolve(orderItem)
            console.log('orderItem : ',orderItem.deliveryDetails);
        })
    },
    getOneOrderProduct : (orderid)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.ORDER_COLLECTION).findOne({_id:ObjectId(orderid)}).then((orderList)=>{
                resolve(orderList)
            })
           
        })
    }
}