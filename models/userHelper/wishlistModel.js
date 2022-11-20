const  ObjectId = require("mongodb").ObjectID

const collection = require("../../config/collection")
const db = require("../../config/connection")

module.exports = {
    addToWishlist :(proId,userId,imgId)=>{
        let proObj = {
            item:ObjectId(proId),
            quantity:1,
            image:ObjectId(imgId)
        }

        return new Promise(async(resolve,reject)=>{
            let wishlist = await db.get().collection(collection.WISHLIST_COLLECTION).findOne({user:ObjectId(userId)})

            if(wishlist){
                let proExist = wishlist.products.findIndex(product => product.item==proId)
                if(proExist!=-1){
                    db.get().collection(collection.WISHLIST_COLLECTION)
                    .updateOne({user:ObjectId(userId),'products.item':ObjectId(proId)},
                    {
                        $inc :{"products.$.quantity":1}
                    }
                    ).then(()=>{
                        resolve()
                    })
                }else{
                    db.get().collection(collection.WISHLIST_COLLECTION)
                    .updateOne({user:ObjectId(userId)},
                    {
                        $push:{products:proObj}
                    }
                    ).then((response)=>{
                        resolve()
                    })
                }

            }else{
                let wishObj = {
                    user:ObjectId(userId),
                    products :[proObj]
                }
                db.get().collection(collection.WISHLIST_COLLECTION).insertOne(wishObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    getWishlistProducts :(userId)=>{
        return new Promise(async(resolve,reject)=>{
            const wishlistItem = await db.get().collection(collection.WISHLIST_COLLECTION).aggregate([
                {
                    $match:{user:ObjectId(userId)}
                },
                {
                    $unwind : "$products"
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from:collection.PRODUCT_COLLECTION,
                        localField:'item',
                        foreignField:'_id',
                        as:"products"
                    }
                },
                {
                    $project:{
                        item:1,
                        quantity:1,
                        products:{$arrayElemAt:["$products",0]}
                    }
                }
            ]).toArray()

            resolve(wishlistItem)
       
           
        })
    },
    getwishlistCount : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count = 0;
            const wishlist = await db.get().collection(collection.WISHLIST_COLLECTION).findOne({user:ObjectId(userId)})
            if(wishlist){
                count = wishlist.products.length
            }
            resolve(count)

        })
    },
    deleteWishlistProduct : (proId,userId)=>{
       
        return new Promise((resolve, reject) => {
            console.log(proId)
            db.get().collection(collection.WISHLIST_COLLECTION)
                .updateOne({ user: ObjectId(userId) },
                    {
                        $pull  : { products: { item: ObjectId(proId) } }
                    }
                ).then((response)=>{
                    resolve(response)
                    console.log("resolved :", response)
                })
                
        })
 
      
        
    }
}

