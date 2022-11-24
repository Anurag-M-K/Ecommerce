const adminHelper = require("../../models/helpers/admin-helper");
const userManagementHelper = require('../../models/userManagementHelper')
const adminOrderModel = require('../../models/adminOrderModel');
const { orderList } = require("../users/usersOrderList");
const userCartHelper = require('../../models/userHelper/userCartHelper');
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
    
      res.json({status:true})
    })
  }

  const orderPage = (req,res)=>{
     adminOrderModel.getOrders().then((orderList)=>{
     
     
      res.render('admin/adminOrder',{admin:true,user:false,orderList})

     })
    
 
  }

  const viewProducts = (req,res)=>{
    let proId = req.query.id

adminOrderModel.getAllOrderedPoducts(proId).then((orderProducts)=>{
 


  res.render('admin/orderProductsPage',{admin:true,user:false,orderProducts})
})

  }






  module.exports = {
    userManagement,
    userBlock,
    userUnblock,
    orderPage,
    viewProducts
  }