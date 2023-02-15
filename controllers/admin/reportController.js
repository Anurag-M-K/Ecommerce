const filerModel = require('../../models/filerModel')
const { orderList } = require('../users/usersOrderList')


const getSalesReports = (req,res)=>{
    let from_Date = req.query.from_date
    let to_Date = req.query.to_date
  
    filerModel.getSalesReportDetails(from_Date,to_Date).then((salesReport)=>{
      
        res.render('admin/salesReport',{admin:false,user:false,salesReport})
    })
}
module.exports = {
    getSalesReports
}