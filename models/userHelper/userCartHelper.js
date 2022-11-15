const ObjectId = require('mongodb').ObjectID
const { response } = require('express')
const collection = require("../../config/collection")
const db = require("../../config/connection")
const { loginview } = require('../../controllers/admin/adloginController')


module.exports = {
    addToCart:(proId,userId,imgId)=>{
        let proObj = {
            item:ObjectId(proId),
            quantity:1,
            image:ObjectId(imgId) //////////////////////made change////////////////////////////////////////////////////////
            
           

        }
                                                                                                                                                
        return new Promise(async(resolve,reject)=>{
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
           
            if(userCart){
                let proExist = userCart.products.findIndex(product => product.item==proId)
              
                if(proExist!=-1){
                    db.get().collection(collection.CART_COLLECTION)
                    .updateOne({user:ObjectId(userId),'products.item':ObjectId(proId)},
                    {
                        $inc :{ 'products.$.quantity':1}
                    }
                    ).then(()=>{
                        
                        resolve()
                        
                    })
                }else{
                db.get().collection(collection.CART_COLLECTION)
                .updateOne({user:ObjectId(userId)},
                {
                    $push:{products:proObj}
                }
                ).then((response)=>{
                    resolve()
                })
            }
                
            }else{
                let cartObj = {
                    user:ObjectId(userId),
                    products : [proObj]
                   
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    
                    resolve()
                    console.log("usercrt : "+userCart);
                })
            }
        })
    },
    getCartProducts : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            const cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match : {user:ObjectId(userId)}
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
                        from :collection.PRODUCT_COLLECTION,
                        localField : 'item',
                        foreignField : "_id",
                        as : "products"
                    }
                    
                },
                {
                    $project:{
                        item:1,quantity:1,products:{$arrayElemAt:['$products',0]}
                    }
                }
            ]).toArray()
            
            
           
         

            resolve(cartItems)
           
        console.log("cart item :",cartItems);
        })
       
    },
    getCartCount : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count = 0
            const cart = await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            
            if(cart){
                count = cart.products.length

            }
            resolve(count)
        })
    },
    changeProductQuantity:(details)=>{
        
        details.count = parseInt(details.count)
        details.quantity = parseInt(details.quantity)

    
        

        return new Promise((resolve,reject)=>{
             if(details.count == -1 && details.quantity == 1){
                    
                db.get().collection(collection.CART_COLLECTION)
                .updateOne({_id:ObjectId(details.cart)},
                {
                    $pull:{products:{item:ObjectId(details.products)}}
                }
                ).then((response)=>{
                  
                    resolve({removeProduct : true})
                })
                
            }else{
            db.get().collection(collection.CART_COLLECTION)
            .updateOne({_id:ObjectId(details.cart),'products.item':ObjectId(details.product)},
            {
                $inc : {"products.$.quantity":details.count }
            }).then((response)=>{
                resolve({status:true})
                
            })
          
        }
   
        })
        
    },
    
    getTotalAmount : (userId)=>{
        
       
            return new Promise(async(resolve,reject)=>{


                const TotalAmount = await db.get().collection(collection.CART_COLLECTION).aggregate([
                   
                    {
                        $match : {user:ObjectId(userId)}
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
                            from :collection.PRODUCT_COLLECTION,
                            localField : 'item',
                            foreignField : "_id",
                            as : "products"
                        }
                        
                    },
                    {
                        $project:{
                            item:1,quantity:1,products:{$arrayElemAt:['$products',0]}
                        }
                    },
                    {
                        $group:{
                            _id:"",
                            total:{
                                $sum:{
                                    $multiply:[
                                        "$quantity","$products.Price"
                                    ]
                                }
                            }
                        }
                    }
                ]).toArray()
             
                
              
                response.TotalAmount = TotalAmount
               
                resolve(TotalAmount[0].total)
                
               
            
            })
           
     },
     
       placeOrder : (order,total,userId)=>{
        return new  Promise(async(resolve,reject)=>{

            
            let cartProducts = await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match: { user: ObjectId(userId) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        localField: 'products.item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity',
                      
                        product: 1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        quantity: 1,
                        productDetails: { $arrayElemAt: ['$product', 0] }
                    }
                }

            ]).toArray()
            
            
            

            
    
            const TotalAmount = await db.get().collection(collection.CART_COLLECTION).aggregate([
                   
                {
                    $match : {user:ObjectId(userId)}
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
                        from :collection.PRODUCT_COLLECTION,
                        localField : 'item',
                        foreignField : "_id",
                        as : "products"
                    }
                    
                },
                {
                    $project:{
                        item:1,quantity:1,products:{$arrayElemAt:['$products',0]}
                    }
                },
                {
                    $group:{
                        _id:'',
                        total:{
                            $sum:{
                                $multiply:[
                                    "$quantity","$products.Price"
                                ]
                            }
                        }
                    }
                }
            ]).toArray()
console.log('total amount :',TotalAmount[0].total);


            let status = order['payment-method']==='COD'?'placed':'pending'
            
            let orderObj = {
                deliveryDetails:{
                    mobile:order.mobile,
                    address:order.address,
                    pincode:order.pincode,
                    orderStatus:status,
                    userId : ObjectId(order.userId),
                    paymentMethod:order['payment-method'],
                    date:new Date(),
                    expected_Date: new Date(+ new Date() + 7 * 35 * 24 * 60 * 1000),
                    products:cartProducts,
                    status:status,
                    TotalAmount:TotalAmount
                },
               
               
                
            }
          
            
            db.get().collection(collection.ORDER_COLLECTION).insertOne(orderObj).then((response)=>{
                resolve(response.insertedId)
      
               
            })
        })
         
     },
     getCartProductList:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartProducts = await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            resolve(cartProducts.products)
        })
     },
     getPaymentMethod : (userId)=>{
        return new Promise(async(resolve,reject)=>{
            let paymentMethod = await db.get().collection(collection.ORDER_COLLECTION).findOne({user:ObjectId(userId)})
            resolve(response)

           
        })
     },
     removeCartProduct : (details)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CART_COLLECTION).updateOne(
                {_id:ObjectId(details)}
            )
        })
     }
    
}