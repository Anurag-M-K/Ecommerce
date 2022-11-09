const collection = require('../config/collection')
const db = require('../config/connection')
var ObjectId = require('mongodb').ObjectId

module.exports = {
   insertBanner:(bannerImageId, newBanner)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collection.BANNER_COLLECTION).insertOne(bannerImageId,newBanner).then((data)=>{
            resolve.apply(data)
        })
    })
   },
   showBanner:()=>{
    return new Promise(async(resolve,reject)=>{
       let banners = await db.get().collection(collection.BANNER_COLLECTION).find().toArray()
        resolve(banners)
    })
   },
   deleteBanner : (bannerId)=>{
    return new Promise(async(resolve,rejecet)=>{
        db.get().collection(collection.BANNER_COLLECTION).deleteOne({_id:ObjectId(bannerId)}).then((response)=>{
            resolve(response)
        })
    })
   }
}