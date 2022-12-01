const adminSession= (req,res,next)=>{
if(req.session.loggedIn){
    next()
}else{
    res.render("admin/admin-login",{admin:false,user:false})
}
}

module.exports = {
    adminSession
}