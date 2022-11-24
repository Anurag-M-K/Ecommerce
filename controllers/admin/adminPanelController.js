const adminOrderModel = require("../../models/adminOrderModel")

const orderStatus = (req,res)=>{
    adminOrderModel.getOrderStatusCount().then((response)=>{
        console.log("order status response :",response);
        let pending;
        let placed;
     

        for(values of response){
            if(values._id.status == 'placed'){
                placed = values.count
            }else if(values._id.status == 'pending'){
                pending=values.count
            // }else if(values._id.status == 'Delivered'){
            //     delivered = values.count
            // }else if(values._id.status == 'Cancelled'){
            //     cancelled = values.count
            }
        }
        console.log("pending :",pending,placed)
        res.render('admin/admin-panel',{admin:true,user:false,pending,placed})
        
    })
}

module.exports = {
    orderStatus
}