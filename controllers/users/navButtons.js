const userHelper = require('../../models/userHelper/userCartHelper')
const categoryHelper = require("../../models/categoryHelper")


const homeButton = (req,res)=>{
    res.redirect('/')
}

const contactUs = async(req,res)=>{
    let userData = req.session.user 

    if(req.session.user){
        let totalAmount = await userHelper.getTotalAmount(req.session.user._id)
       
        let products = await userHelper.getCartProducts(req.session.user._id)
            let  cartCount = await  userHelper.getCartCount(req.session.user._id)
            categoryHelper.getAllCategories().then((CategoryDetails) => {
    res.render('users/contactUs',{user:true,admin:false,CategoryDetails,cartCount,products,totalAmount,userData})
            })
}
}

const aboutPage = async(req,res)=>{
    let userData = req.session.user 

   
        let totalAmount = await userHelper.getTotalAmount(req.session.user._id)
       
        let products = await userHelper.getCartProducts(req.session.user._id)
            let  cartCount = await  userHelper.getCartCount(req.session.user._id)
            categoryHelper.getAllCategories().then((CategoryDetails) => {

                res.render('users/aboutUs',{user:true,admin:false,userData,totalAmount,products,cartCount,CategoryDetails})
            })
        
}

module.exports = {
     homeButton,
     contactUs,
     aboutPage
}