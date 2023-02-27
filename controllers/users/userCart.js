const { Router } = require("express");
const userCartHelper = require("../../models/userHelper/userCartHelper");
const userHelper = require("../../models/userHelper/userCartHelper");
const categoryHelper = require("../../models/categoryHelper");
const adminCoupenModel = require("../../models/adminCoupenModel");
const addToCart = (req, res) => {
  userHelper.addToCart(req.params.id, req.session.user._id).then(() => {
    res.json({ status: true });
  });
};

let cart = async (req, res) => {
  let userData = req.session.user;
  let cartCount = null;
  req.session.loggedIn;
  let total = 0;

  if (userData) {
    cartCount = await userHelper.getCartCount(req.session.user._id);
    let products = await userHelper.getCartProducts(req.session.user._id);
    // let cart  = await userCartHelper.getCart(req.session.user._id)

    let totalAmount = 0;
    if (products.length > 0) {
      totalAmount = 0;
      totalAmount = await userCartHelper.getTotalAmount(req.session.user._id);
    }

    if (products.length < 0) {
      totalAmount = 0;
    }

    adminCoupenModel.getCoupen().then((coupen) => {
      categoryHelper.getAllCategories().then((CategoryDetails) => {
        res.render("users/cart", {
          user: true,
          admin: false,
          userData,
          products,
          cartCount,
          totalAmount,
          CategoryDetails,
          coupen,
          cart,
        });
      });
    });
  } else {
    res.render("users/usersLogin", { user: false, admin: false, userData });
  }
};

const productCount = (req, res, next) => {
  let userData = req.session.user;
  userHelper.changeProductQuantity(req.body).then(async (response) => {
    
    userHelper.getTotalAmount(userData._id).then((result) => {
      // let totalAmount = result.totalAmount;
   
userCartHelper.getCart(req.session.user._id).then((cart)=>{
 
  res.json({ response, result});
})
   
    });
  });
};

const deleteCartProduct = (req, res) => {
  let userData = req.session.user._id;
  let item = req.query.item;

  userHelper.deleteCartProducts(item, userData).then((response) => {
    res.redirect("/users/cart");
  });
};

module.exports = {
  cart,
  addToCart,
  productCount,
  deleteCartProduct,
};
