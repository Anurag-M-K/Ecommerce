
const adminLogin = require("../../models/helpers/admin-helper");
const count = require('../../models/count');
const { CURSOR_FLAGS } = require("mongodb");




const loginview = (req, res) => {
  res.render("admin/admin-login", { admin: false, user: false });
};



const adminLoginAction = async(req, res) => {
  let userCount = await count.userCount()
  let categoryCount = await count.categoryCount()
  let productCount = await count.productCount()
  let brandCount = await count.brandCount()
  let orderCount = await count.orderCount()
 
  adminLogin.adminDoLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;

      res.render("admin/admin-panel", { admin: true, user: false,userCount,categoryCount,productCount,brandCount ,orderCount});
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
          res.render("admin/admin-login", { admin: false, user: false })
      }
  })
}




module.exports = {
  loginview,

  adminLoginAction,


 
  adminPanelButtonController,
  
  adminLogoutControllers
};
