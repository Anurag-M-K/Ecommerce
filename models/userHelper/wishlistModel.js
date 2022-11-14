const  ObjectId = require("mongodb").ObjectID
const collection = require("../../config/collection")


module.exports = {
    addToWishlist :(proId,userId,imgId)=>{
        let proObj = {
            item:ObjectId(proId),
            quantity:1,
            image:ObjectId(imgId)
        }

        return new Promise(async(resolve,reject)=>{
            let wistlist = await db.get().collection(collection.)
        })
    }
}