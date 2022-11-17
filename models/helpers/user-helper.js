const { response } = require('express');
const { resolve } = require('path');
const ObjectId = require('mongodb').ObjectID
const db = require('../../config/connection')
const bcrypt = require('bcrypt')
const collection = require('../../config/collection');
const { log } = require('console');
const { ObjectID } = require('bson');



module.exports = {
    insertUserCredentials : (verified,Name,Email,Password,Lname,Phone,state)=>{
        return new Promise(async (resolve,reject)=>{
            Password = await bcrypt.hash(Password,10);
            console.log(Password);
            db.get()
            .collection(collection.USER_COLLECTION)
            .insertOne({ verified,Name,Email,Password,Lname,Phone,state})
            .then((data)=>{
                resolve(data);
            })
        })
    },

    userDoLogin : (userdata)=>{
        return new Promise (async(resolve, reject)=>{
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({Name:userdata.username})
            
            if(user){
                console.log("user found");
                if(user.verified==1   && user.state=="active")
            
                {
                   
                bcrypt.compare(userdata.Password,user.Password).then((status)=>{
                    if(status){
                        response.user = user
                        response.status = true
                        console.log("Success");
                        resolve(response)
                    }else{
                        console.log("Fail");
                        resolve({status:false})
                    }
                })

            }else{
                console.log("user not found");

                resolve({status:false})
            }

                
        }else{
            resolve({status:false})
        }
    });  
    },
 

    updateVerified : (userId)=>{    
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:userId},{
                $set:{
                    verified:1
                }
            }).then((response)=>{
                resolve(response)
            })
        })
    },
    updateUserDetails:(userData,bodyData)=>{
        console.log("checking model userdata :",userData);
        console.log("checking model bodyData :",bodyData);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userData._id)},
                {
                    $set:{
                        Name:bodyData.Name,
                        Email:bodyData.Email,
                        Phone:bodyData.mobile
                    }
                }).then((response)=>{
                    resolve(response)
                    console.log("checking response :",response);
                })
        })
    }
    
}
