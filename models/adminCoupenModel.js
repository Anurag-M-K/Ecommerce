const db = require('../config/connection')
const collection = require("../config/collection")
const { response } = require('express')
const { resolveContent } = require('nodemailer/lib/shared')
var objectId = require('mongodb').ObjectId


module.exports = {
    addCoupen :(coupenData,callback)=>{
        db.get().collection(collection.COUPEN_COLLECTION).insertOne(coupenData).then((response)=>{
            callback(response)
        })
    },
    getCoupen : ()=>{
        return new Promise(async(resolve,reject)=>{
            let coupen = await db.get().collection(collection.COUPEN_COLLECTION).find().toArray()
            resolve(coupen)
            console.log("model getcoupen :",coupen);
        })
    }

}