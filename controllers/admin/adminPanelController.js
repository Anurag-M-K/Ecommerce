const adminOrderModel = require("../../models/adminOrderModel")

const orderStatus = (req,res)=>{
    adminOrderModel.getOrderStatusCount().then((response)=>{
      
        let pending;
        let placed;
     

        for(values of response){
            if(values._id.status == 'placed'){
                placed = values.count
            }else if(values._id.status == 'pending'){
                pending=values.count
        
            }
        }
        
        res.render('admin/admin-panel',{admin:true,user:false,pending,placed})
        
    })
}

module.exports = {
    orderStatus
}