const db = require('../config/connection')
const collections = require('../config/collection')
const { ObjectId } = require('mongodb')
const { userSignupBcrypt } = require('../controllers/users/usersController')
const bcrypt = require('bcrypt')
const { ObjectID } = require('mongodb')
module.exports = {
    addProduct: (file_url,imageID,productionData)=>{
        return new Promise(async(resolve,reject)=>{
            parseInt("Price")
            let state='active'
            db.get().collection(collections.PRODUCT_COLLECTION).insertOne(file_url,imageID,productionData,state).then((data)=>{
             
                resolve.apply(data)
             
            })
        })
    },

    getAllProducts : ()=>{
        return new Promise(async(resolve,reject)=>{
         let products = await db.get().collection(collections.PRODUCT_COLLECTION).find().toArray()
       
            resolve(products)
    
        
    
        })
    },
    getAllProductsForUser : ()=>{
        return new Promise(async(resolve,reject)=>{
         let products = await db.get().collection(collections.PRODUCT_COLLECTION).find({state:'active'}).toArray()
       
            resolve(products)
    
        
    
        })
    },
    getProductDetails:(id)=>{
        return new Promise((resolve,reject)=>{
           db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:ObjectId(id)}).then((products)=>{
           
                resolve(products)
            })
        })
    },
    deleteProducts:(id)=>{
        return new Promise((resolve,reject)=>{
             db.get().collection(collections.PRODUCT_COLLECTION).deleteOne({_id:ObjectId(id)}).then((response)=>{
                resolve(response)
            })
        })
    },
    updateProductDetails : (file_url,productId,productDetails,productImage )=>{
        console.log("log",productDetails)
       
       
        
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({_id:ObjectId(productId)},{
                $set:{
                    productName:productDetails.productName,
                    Price:parseInt(productDetails.Price),
                    Category:productDetails.Category,
                    brandName:productDetails.brandName,
                    Quantity :parseInt( productDetails.Quantity),
                    file_url:file_url,
                    Pitcure: productImage,
                    state:'active'
                    
                },
            }).then((response)=>{
                resolve(response)
                console.log("response ofn image :",response);
            })
        })
    },
    showOneProduct:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:ObjectId(id)}).then((product)=>{
                resolve(product)
            })
        })
    },
    checkProducts : (proId)=>{
        return new Promise(async(resolve,reject)=>{
            let productDetails = await db.get().collection(collections.PRODUCT_COLLECTION).findOne({_id:ObjectId(proId)})
            let products = await db.get().collection(collections.PRODUCT_COLLECTION).find({})
        })
    },
    softDelete : (proDetails)=>{
        console.log("id in model:",proDetails);
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({
                _id:ObjectId(proDetails)
            },
            {
                $set:{state:'deleted'}
            }).then((response)=>{
                resolve(response)
                console.log("response",response);
            })
        })
    },
    InStock:(proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.PRODUCT_COLLECTION).updateOne({
                _id:ObjectId(proDetails)
            },
            {
                $set:{state:'active'}
            }).then((response)=>{
                resolve(response)
            })
        })
    }
      
}