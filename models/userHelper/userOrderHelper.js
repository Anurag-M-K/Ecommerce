const ObjectId = require('mongodb').ObjectID
const { response } = require('express')
const collection = require("../../config/collection")
const db = require("../../config/connection")



module.exports = {
     getUserOrders : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            let productList = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
            // let productList =await db.get().collection(collection.ORDER_COLLECTION).aggregate([
            //     {
            //         $match : { user: ObjectId(userId)}
            //     }
            // ]).toArray()
            
            
            resolve(productList)
            console.log('hosidffffffffffff',productList);
            
        })
    }
}