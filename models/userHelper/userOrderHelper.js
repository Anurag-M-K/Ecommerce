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
    }
}