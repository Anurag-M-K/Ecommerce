const adminHelper = require("../../models/helpers/admin-helper");
const userManagementHelper = require('../../models/userManagementHelper')

const userManagement = (req, res) => {
    adminHelper.showUser(req.body).then((userDetails) => {
      res.render("admin/user-management", { userDetails,admin:true,user:false});
    });
  };

  const userBlock = (req,res)=>{
    userManagementHelper.blockUser(req.body.userId).then((response)=>{
      res.json({status:true})
    })
  }


  const userUnblock = (req,res)=>{
    userManagementHelper.unBlockUser(req.body.userId).then((response)=>{
      console.log("respnse ;",response);
      res.json({status:true})
    })
  }



  module.exports = {
    userManagement,
    userBlock,
    userUnblock
  }