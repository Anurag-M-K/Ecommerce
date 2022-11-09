
const adminLogin = require("../../models/helpers/admin-helper");





const loginview = (req, res) => {
  res.render("admin/admin-login", { admin: false, user: false });
};

const adminLoginAction = (req, res) => {
  adminLogin.adminDoLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;

      res.render("admin/admin-panel", { admin: true, user: false });
    } else {
      res.redirect("/admin");
    }
  });
};


//admin panel button to admin panel
const adminPanelButtonController = (req, res) => {
  res.render("admin/admin-panel",{admin:true,user:false});
};





///admin logout

const adminLogoutControllers = (req,res)=>{
  req.session.destroy(function(err){
      if(err){
          res.send('error')
      }else{
          res.redirect('/admin')
      }
  })
}




module.exports = {
  loginview,

  adminLoginAction,


 
  adminPanelButtonController,
  
  adminLogoutControllers
};
