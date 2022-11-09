const brandHelpers = require('../../models/brandHelpers')

//adding brand
const addBrandController = (req, res) => {
    brandHelpers.addbrand(req.body, (result) => {
      res.redirect("brandCategory");
    });
  };


  const brandSaveDatabaseController = (req, res) => {
    brandHelpers.addbrand(req.body, (result) => {
      res.redirect("brandCategory");
    });
  };


  
//delteing brand
const deleteBrandController = (req, res) => {
    brandHelpers.deleteBrand(req.query.id).then((response) => {
      res.redirect("brandCategory");
    });
  };


  // brand button

const brandController = (req, res) => {
  
    brandHelpers.getAllBrands().then((Brand) => {
      res.render("admin/brandCategory", { Brand,admin:true,user:false });
    });
  };
  module.exports = {
    brandController,
    addBrandController,
    brandSaveDatabaseController,
    deleteBrandController
  }