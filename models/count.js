const db = require('../config/connection')
const collection = require("../config/collection")

module.exports = {
    userCount : ()=>{
        return new Promise(async(resolve,reject)=>{
            let userCount =await db.get().collection(collection.USER_COLLECTION).find().count()
            resolve(userCount)
            console.log("count of users:",userCount)
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
    }
}