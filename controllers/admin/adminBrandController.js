const { response } = require('express');
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
const deleteBrandController = async(req, res) => {
  let brandId = req.query.id
  console.log("brand id :",brandId);
  await brandHelpers.checkProducts(brandId).then((products)=>{
if(products.length>0){
  response.status = false;
  res.json(response)
}else{
  brandHelpers.deleteBrand(brandId).then((response)=>{
    response.status = true
    res.json(response)
  })
}
})
  
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