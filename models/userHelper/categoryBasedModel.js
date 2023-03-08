const db = require("../../config/connection")
const collection = require("../../config/collection")
const { ObjectId } = require("mongodb")
module.exports = {
    getCategoryProduct :(catName)=>{
       return new Promise(async(resolve,reject)=>{
      let products = await  db.get().collection(collection.PRODUCT_COLLECTION).aggregate([
            {
                $match:{Category:catName}
            }
        ]).toArray()
        resolve(products)
       
       })
    }
}