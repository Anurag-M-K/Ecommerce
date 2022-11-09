const bannerHelper = require('../../models/bannerHelper')


const showBannerPage = (req,res)=>{
    bannerHelper.showBanner().then((banners)=>{
       res.render('admin/adminBanner',{admin:true,user:false,banners})
 
    })
 }


const addBanner = (req,res)=>{
    const {bannerName,bannerOffer} = req.body
bannerHelper.insertBanner({bannerImage:req.file.filename,bannerName,bannerOffer}).then((response)=>{
    res.redirect('/admin/adminBanner')
})
}




const deleteBanner = (req,res)=>{
    let id = req.body.bannerId
    bannerHelper.deleteBanner(id).then((response)=>{
        res.json(response)
    })
}

module.exports = {
    showBannerPage,
   addBanner,
  deleteBanner
}