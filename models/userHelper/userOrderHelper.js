const ObjectId = require('mongodb').ObjectID
const { response } = require('express')
const collection = require("../../config/collection")
const db = require("../../config/connection")



module.exports = {
    
     getUserOrders : (userId)=>{
        
        return new Promise(async(resolve,reject)=>{
            let productList = await db.get().collection(collection.ORDER_COLLECTION).find({userId:(userId)}).toArray()
         
            
            
            resolve(productList)
            console.log("productList",productList);
          
          
            
        })
    },
    // getOrderList: (userId) => {
    //     return new Promise(async (resolve, reject) => {
    //         let productList = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
    //             {
    //                 $group: {_id:{useId:{userId}}}
    //             },
    //         ]).toArray()
    //         resolve(productList)
    //         console.log("PRPPOSUCTLIST",productList);

    //     })
    // },
    
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
    // getOneOrderProduct : (orderid)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         db.get().collection(collection.ORDER_COLLECTION).findOne({_id:ObjectId(orderid)}).then((orderList)=>{
    //             resolve(orderList)
    //         })
           
    //     })
    // },
    getOneOrderProduct : (orderId)=>{
        return new Promise(async(resolve,reject)=>{
            let orderList = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match:{_id:ObjectId(orderId)}
                },
                {
                    $unwind:"$deliveryDetails.products"
                }
            ]).toArray()
            resolve(orderList)
            
        })
    }
}