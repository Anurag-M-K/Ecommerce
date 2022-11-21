const db = require('../config/connection')
const collection = require("../config/collection")
const { response } = require('express')
const { resolveContent } = require('nodemailer/lib/shared')
var objectId = require('mongodb').ObjectId


module.exports = {
    addCoupen :(coupenData,callback)=>{
        console.log("coupen data :",coupenData);
       coupenData.discount =  parseInt(coupenData.discount) 
                db.get().collection(collection.COUPEN_COLLECTION).insertOne(coupenData).then((response)=>{
            callback(response)
        })
    },
    getCoupen : ()=>{
        return new Promise(async(resolve,reject)=>{
            let coupen = await db.get().collection(collection.COUPEN_COLLECTION).find().toArray()
            resolve(coupen)
           
        })
    },
    deleteCoupen :(id)=>{
        console.log("id model : : :",id);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COUPEN_COLLECTION).deleteOne({_id:objectId(id)}).then((response)=>{
                resolve(response)
            })
        })
    }

}