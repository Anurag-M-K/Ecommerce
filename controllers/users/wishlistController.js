const categoryHelper = require('../../models/categoryHelper')
const wishlistModel = require('../../models/userHelper/wishlistModel')
const userHelper = require('../../models/userHelper/userCartHelper')

const addTowishlist = (req,res)=>{

    wishlistModel.addToWishlist(req.params.id,req.session.user._id).then(()=>{
        res.json({status:true})
    })
}

const wish = async(req,res)=>{
    let userData = req.session.user;
    if(req.session.loggedIn){
        let cartCount = await wishlistModel.getwishlistCount(req.session.user._id)
       let  wishlistCount = await wishlistModel.getwishlistCount(req.session.user._id)
      
       wishlistModel.getWishlistProducts(req.session.user._id).then((products)=>{
        categoryHelper.getAllCategories().then((CategoryDetails)=>{
             res.render('users/wishlist',{user:true,admin:false,CategoryDetails,products,userData,wishlistCount,cartCount})
        
        })
    })
           
    }else{
        res.redirect("/userslogin",{user:false,admin:false,userData})
    }
}


const deleteProduct = (req,res)=>{
    let proId = req.query.id
   let  userData = req.session.user._id

    wishlistModel.deleteWishlistProduct(proId,userData).then((response)=>{
      
        res.redirect('/users/wishList')
    })
}

module.exports = {
    addTowishlist,
    wish,
    deleteProduct
}