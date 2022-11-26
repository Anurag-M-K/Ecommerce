const db = require('../config/connection')
const collection = require("../config/collection")

module.exports = {
    userCount : ()=>{
        return new Promise(async(resolve,reject)=>{
            let userCount =await db.get().collection(collection.USER_COLLECTION).find().count()
            resolve(userCount)
         
        })
    },
    categoryCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let categoryCount =await db.get().collection(collection.CATEGORIES_COLLECTION).find().count()
            resolve(categoryCount)
        })

    },
    productCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let productCount =await db.get().collection(collection.PRODUCT_COLLECTION).find().count()
            resolve(productCount)
        })
    },
    brandCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let brandCount =await db.get().collection(collection.BRAND_COLLECTION).find().count()
            resolve(brandCount)
        })
    },
    orderCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let orderCount =await db.get().collection(collection.ORDER_COLLECTION).find().count()
            resolve(orderCount)
        })
    },
    placedCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let placedCount =  await db.get().collection(collection.ORDER_COLLECTION).find({status:'placed'}).count()
            resolve(placedCount)

        })
    },
    shippedCount:()=>{
        return new Promise(async(resolve,reject)=>{
            let shippedCount = await db.get().collection(collection.ORDER_COLLECTION).find({status:'shipped'}).count()
            resolve(shippedCount)
        })
    },
    deliveredCount:()=>{
        return new Promise((resolve,reject)=>{
            let deliveredCount = db.get().collection(collection.ORDER_COLLECTION).find({status:'delivered'}).count()
            resolve(deliveredCount)
        })
    },
    cancelCount:()=>{
        return new Promise(async(resolve,reject)=>{
           let cancelCount = await db.get().collection(collection.ORDER_COLLECTION).find({status:'cancelled'}).count()
            resolve(cancelCount)
        })
    }
}