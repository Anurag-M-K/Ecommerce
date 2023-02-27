const bannerHelper = require('../../models/bannerHelper')


const showBannerPage = (req,res)=>{
    bannerHelper.showBanner().then((banners)=>{
       res.render('admin/adminBanner',{admin:true,user:false,banners})
 
    })
 }


const addBanner = (req,res)=>{
    const {bannerName,bannerOffer} = req.body
    let bannerImage = req.file.path
bannerHelper.insertBanner({bannerImage,bannerName,bannerOffer}).then((response)=>{
    res.redirect('/admin/adminBanner')
})
}

const bannerRedirect = (req,res)=>{
    res.redirect('/adminBanner')
}




const deleteBanner = (req,res)=>{
    let id = req.body.bannerId
   
    bannerHelper.deleteBanner(id).then((response)=>{
       res.redirect('/adminBanner')
    })
}

module.exports = {
    showBannerPage,
   addBanner,
  deleteBanner,
  bannerRedirect
}