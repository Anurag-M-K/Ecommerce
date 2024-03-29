const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users/usersController");
const userCart = require("../controllers/users/userCart");
const userCheckOut = require("../controllers/users/userCheckOut");
const userSinglePage = require("../controllers/users/userSinglePage");
const navButtons = require("../controllers/users/navButtons");
const categoryBasedPage = require("../controllers/users/categoryBasedPage");
const usersOrderList = require("../controllers/users/usersOrderList");
const order = require("../controllers/users/order");
const profile = require("../controllers/users/profile");
const wishlistController = require("../controllers/users/wishlistController");
const coupenController = require("../controllers/users/userCoupenController");
const session = require("../middleware/userSession");
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/userslogin");
  }
};

router.get("/", usersController.userHomePage);
router.post("/login", usersController.userSessionController);

router.get("/userslogin", usersController.userLogin);
router.post("/signup", usersController.userSignup);
router.get("/header/usersignup", usersController.signupFromHome);

router.post("/signup", usersController.userSignupBcrypt);
router.get("/logout", usersController.logout);
router.post("/checkOtp", usersController.checkOtp);

//cart
router.get("/add-to-cart/:id", userCart.addToCart);
router.post("/cart/applyCoupen", coupenController.applyCoupen);
router.get("/users/cart", userCart.cart);
router.post("/change-product-quantity", userCart.productCount);
router.delete("/removeCartProduct");
router.get("/users/deleteCartProduct/", userCart.deleteCartProduct);

//wishlist
router.get("/add-to-wishlist/:id", wishlistController.addTowishlist);
router.get("/users/wishList", wishlistController.wish);
router.get("/users/deleteWishlist", wishlistController.deleteProduct);
router.get("/addtocartWishList/:id", wishlistController.addToCartWishlist);

//checkout
router.post("/place-order", userCheckOut.checkOut);

//category based page
router.get("/categoryBasedPage", categoryBasedPage.categoryBased);

//single page
router.get("/users/singlePage", userSinglePage.single);

//nav buttonsu
router.get("/homeButton", navButtons.homeButton);
router.get("/contact", navButtons.contactUs);
router.get("/about", navButtons.aboutPage);

//plceorder
router.get("/addressPayment", userCheckOut.payment);
router.get("/orderPlaced", usersOrderList.orderSuccess);
router.get("/view-order-products", order.viewOrderProducts);

//orderlist
router.get("/orderList", usersOrderList.orderList);

//payment
router.post("/verify-payment", userCheckOut.verifyingPayment);

//prpofile
router.get("/users/profile", profile.profilePage);
router.get("/toOrder", profile.toOrder);
router.get("/toCart", profile.toCart);
router.get("/logoutFromProfile", profile.logOutProfile);
router.get("/toWishlist", profile.toWishlist);
router.get("/edit-profile", profile.edtitProfile);
router.post("/users/editUserDetails", profile.updateProfile);
router.get("/addressaddPage", profile.address);
router.post("/add-address", profile.addressAdd);

router.post("/cart/proceedTocheckOut", userCheckOut.checkingOutPage);

module.exports = router;
