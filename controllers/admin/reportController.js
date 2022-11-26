const filerModel = require('../../models/filerModel')
const { orderList } = require('../users/usersOrderList')


const getSalesReports = (req,res)=>{
    let from_Date = req.query.from_date
    let to_Date = req.query.to_date
    console.log("asales dates",from_Date);
    console.log("csales 2dates",to_Date);
    filerModel.getSalesReportDetails(from_Date,to_Date).then((salesReport)=>{
        console.log("getsales report orderalist :",salesReport);
        res.render('admin/salesReport',{admin:false,user:false,salesReport})
    })
}
module.exports = {
    getSalesReports
}