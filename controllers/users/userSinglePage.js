
const single = (req,res)=>{
    let userData = req.session.user

    res.render('users/singlePage',{user:true,admin:false,userData})
}

module.exports = {
    single
}