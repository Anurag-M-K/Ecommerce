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


  const deleteCategoryController = (req, res) => {
    categoryHelper.deleteCategory(req.query.id).then((response) => {
      res.redirect("/admin/admincategory");
    });
  };
  


  module.exports = {
    catogoryPageController,

    addCategoryController,
    
    deleteCategoryController
  }