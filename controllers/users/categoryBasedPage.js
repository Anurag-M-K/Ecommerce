const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require("../../models/categoryHelper")
const categoryBasedModel = require('../../models/userHelper/categoryBasedModel')



const categoryBased = (req,res)=>{
    let userData = req.session.user
    let catName = (req.query.catName)   
    if(userData){
        categoryHelper.getAllCategories().then((CategoryDetails) => {
            categoryBasedModel.getCategoryProduct(catName).then(async(products)=>{
                var  cartCount = await userHelper.getCartCount(req.session.user._id)
                res.render('users/categoryBasedPage',{user:true,admin:false,userData,cartCount,products,CategoryDetails})
            })
        })
    }else{
        categoryHelper.getAllCategories().then((CategoryDetails) => {
            categoryBasedModel.getCategoryProduct(catName).then(async(products)=>{
                var  cartCount = await userHelper.getCartCount(req.session.user)      
                res.render('users/categoryBasedPage',{user:true,admin:false,userData,cartCount,products,CategoryDetails})
            })
        })
    }
   
   
}

module.exports = {
    categoryBased
}