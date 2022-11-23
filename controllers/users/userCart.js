const { Router } = require("express");
const userCartHelper = require("../../models/userHelper/userCartHelper");
const userHelper = require("../../models/userHelper/userCartHelper");
const categoryHelper = require("../../models/categoryHelper");

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
    console.log(products);
    let totalAmount = 0;
    if (products.length > 0) {
      totalAmount = 0;
      totalAmount = await userCartHelper.getTotalAmount(req.session.user._id);
    }
    console.log("TOTOSL :", totalAmount);

    if (products.length < 0) {
      totalAmount = 0;
    }

    categoryHelper.getAllCategories().then((CategoryDetails) => {
      res.render("users/cart", {
        user: true,
        admin: false,
        userData,
        products,
        cartCount,
        totalAmount,
        CategoryDetails,
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
      // userCartHelper.subTotal(userData._id).then((sub)=>{
      let totalAmount = result.totalAmount;
      // let subTotal = sub.subTotal

      res.json({ response, result });
      // })
    });
  });
};

const deleteCartProduct = (req, res) => {
  let userData = req.session.user._id;
  let item = req.query.item;
  console.log("item :", item);
  console.log("userData :", userData);
  userHelper.deleteCartProducts(item, userData).then((response) => {
    console.log("this is delete check ");
    res.redirect("/users/cart");
  });
};

module.exports = {
  cart,
  addToCart,
  productCount,
  deleteCartProduct,
};
