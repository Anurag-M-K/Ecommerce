const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require("../../models/categoryHelper")
const categoryBasedModel = require('../../models/userHelper/categoryBasedModel')
const { Logger } = require('mongodb')


const categoryBased = (req,res)=>{
    let userData = req.session.user
    let catName = (req.query.catName)
    console.log("catName :",catName);
   
       
        categoryHelper.getAllCategories().then((CategoryDetails) => {
            console.log("ljdfjh",CategoryDetails);
            categoryBasedModel.getCategoryProduct(catName).then(async(products)=>{
                let  cartCount = await userHelper.getCartCount(req.session.user._id)
                console.log("products:",products);
                console.log(cartCount);
                res.render('users/categoryBasedPage',{user:true,admin:false,userData,cartCount,products,CategoryDetails})
            })
       
        })
   
       
  
   
}

module.exports = {
    categoryBased
}