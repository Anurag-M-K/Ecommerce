const userHelper = require('../../models/userHelper/userCartHelper')




const categoryBased = (req,res)=>{
    let userData = req.session.user
    if(req.session.user){
        let  cartCount =  userHelper.getCartCount(req.session.user._id)
        let products = userHelper.getCartProducts(req.session.user._id)
        res.render('users/categoryBasedPage',{user:true,admin:false,userData,cartCount,products})
    }else{
        res.redirect('/')
    }
   
}

module.exports = {
    categoryBased
}