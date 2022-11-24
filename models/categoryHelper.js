const { response } = require('express')
const collection = require('../config/collection')
var db = require('../config/connection')
var objectId = require('mongodb').ObjectId
module.exports = {
   addCategory:(Categories,callback)=>{
    db.get().collection(collection.CATEGORIES_COLLECTION).insertOne(Categories).then((data)=>{
        callback(data)
    })
},
getAllCategories:()=>{
    return new Promise(async(resolve,reject)=>{
        let Categories = await db.get().collection(collection.CATEGORIES_COLLECTION).find().toArray()
        resolve(Categories)
      
    })
},

deleteCategory:(catId)=>{
    return new Promise(async(resolve,reject)=>{
       await db.get().collection(collection.CATEGORIES_COLLECTION).deleteOne({_id:objectId(catId)}).then((response)=>{
          
            resolve(response)
         
        })
    })
},

editCategory:(catId,Categories)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collection.CATEGORIES_COLLECTION).updateOne({_id:ObjectId(catId)},{
            $set:{
            category:Categories._category
            }
        })
    })
},
checkProducts : (catId)=>{
    return new Promise(async(resolve,reject)=>{
        let categoryDetails = await db.get().collection(collection.CATEGORIES_COLLECTION).findOne({_id:objectId(catId)})
        let products = await db.get().collection(collection.PRODUCT_COLLECTION).find({Category:categoryDetails._category}).toArray()
        resolve(products)
        
    })
}


}


