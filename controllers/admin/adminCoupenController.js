const adminCoupenModel = require("../../models/adminCoupenModel")

const coupenPage = (req,res)=>{
    adminCoupenModel.getCoupen().then((coupen)=>{
        console.log("coupen :",coupen);
        res.render('admin/coupenAddPage',{admin:true,user:false,coupen})
    })
   
}


const addCoupen = (req,res)=>{
    adminCoupenModel.addCoupen(req.body,(result)=>{
       
        res.redirect("/admin/coupen")
    })
    }



module.exports = {
    coupenPage,
    addCoupen
}