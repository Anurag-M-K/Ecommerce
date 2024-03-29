const adminCoupenModel = require("../../models/adminCoupenModel")

const coupenPage = (req,res)=>{
    adminCoupenModel.getCoupen().then((coupen)=>{
        res.render('admin/coupenAddPage',{admin:true,user:false,coupen})
    })
   
}


const addCoupen = (req,res)=>{
    adminCoupenModel.addCoupen(req.body,(result)=>{
       
        res.redirect("/admin/coupen")
    })
    }

const deleteCoupen = (req,res)=>{
    let coupenId = req.query.id
    
    adminCoupenModel.deleteCoupen(coupenId).then(()=>{
        
        res.redirect('/admin/coupen')
    })
}





module.exports = {
    coupenPage,
    addCoupen,
    deleteCoupen
   
}