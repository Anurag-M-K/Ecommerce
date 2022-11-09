const adminHelper = require("../../models/helpers/admin-helper");


const userManagement = (req, res) => {
    adminHelper.showUser(req.body).then((userDetails) => {
      res.render("admin/user-management", { userDetails,admin:true,user:false});
    });
  };

  module.exports = {
    userManagement
  }