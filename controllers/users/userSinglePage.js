const productHelpers = require("../../models/productHelpers")
const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require("../../models/categoryHelper")


const single = async(req,res)=>{
    console.log(req.query);
    let id = req.query
    let userData = req.session.user
    let  cartCount = await  userHelper.getCartCount()
    let CategoryDetails = categoryHelper.getAllCategories()

     productHelpers.getProductDetails(id).then((products)=>{
       
        res.render('users/singlePage',{user:true,admin:false,userData,products,cartCount,CategoryDetails})
    })
    }

  

module.exports = {
    single
}