const { ObjectId } = require('mongodb')
const db = require('../config/connection')
const collection = require('../config/collection')


module.exports = {
    blockUser : (userId)=>{
    
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({
                _id:ObjectId(userId)
            },
            {
                $set :{
                    state:'blocked'
                }
            }
            ).then((response)=>{
                resolve(response)
            })
        })
    },
    unBlockUser : (userId)=>{
      
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({
                _id:ObjectId(userId)
            },
            
            {
                $set:{state:"active"}
            }).then((response)=>{
                resolve(response)
            })
        })
    }
}