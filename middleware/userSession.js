const userSession = (req,res,next)=>{
    if(req.session.loggrdIn){
        next()
    }else{
        res.render("users/usersLogin", { user: false, admin: false })
    }
}
module.exports = {
    userSession 
}