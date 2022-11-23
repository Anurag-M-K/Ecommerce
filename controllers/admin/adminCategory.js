const deleteCategory = require("../../models/categoryHelper");
const categoryHelper = require("../../models/categoryHelper");



const catogoryPageController = (req, res) => {
    categoryHelper.getAllCategories().then((Categories) => {
      res.render("admin/adminCategory", { Categories, admin: true, user: false });
    });
  };

  const addCategoryController = (req, res) => {
    categoryHelper.addCategory(req.body, (result) => {
      res.redirect("adminCategory");
    });
  };


  const deleteCategoryController = async(req, res) => {
    let catId = req.query.id
    await categoryHelper.checkProducts(catId).then((products)=>{
      if(products.length > 0){
        response.status = false;
        res.json(response)
      }else{
        categoryHelper.deleteCategory(catId).then((response)=>{
          response.status = true;
          res.json(response)
        })
      }

    })
   
  };
  


  module.exports = {
    catogoryPageController,

    addCategoryController,
    
    deleteCategoryController
  }