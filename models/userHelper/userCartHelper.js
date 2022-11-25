const ObjectId = require("mongodb").ObjectID;
const { ObjectID } = require("bson");
const { response } = require("express");
const collection = require("../../config/collection");
const db = require("../../config/connection");
const { loginview } = require("../../controllers/admin/adloginController");

module.exports = {
  addToCart: (proId, userId, imgId) => {
    let proObj = {
      item: ObjectId(proId),
      quantity: 1,
      image: ObjectId(imgId),
    };

    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .findOne({ user: ObjectId(userId) });

      if (userCart) {
        let proExist = userCart.products.findIndex(
          (product) => product.item == proId
        );

        if (proExist != -1) {
          db.get()
            .collection(collection.CART_COLLECTION)
            .updateOne(
              { user: ObjectId(userId), "products.item": ObjectId(proId) },
              {
                $inc: { "products.$.quantity": 1 },
              }
            )
            .then(() => {
              resolve();
            });
        } else {
          db.get()
            .collection(collection.CART_COLLECTION)
            .updateOne(
              { user: ObjectId(userId) },
              {
                $push: { products: proObj },
              }
            )
            .then((response) => {
              resolve();
            });
        }
      } else {
        let cartObj = {
          user: ObjectId(userId),
          products: [proObj],
        };
        db.get()
          .collection(collection.CART_COLLECTION)
          .insertOne(cartObj)
          .then((response) => {
            resolve();
          });
      }
    });
  },
  getCartProducts: (userId) => {
    return new Promise(async (resolve, reject) => {
      const cartItems = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .aggregate([
          {
            $match: { user: ObjectId(userId) },
          },

          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },

          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              products: { $arrayElemAt: ["$products", 0] },
            },
          },
        ])
        .toArray();

      resolve(cartItems);
    });
  },
  addToCartWishlist: (userId) => {
    return new Promise(async (resolve, reject) => {
      const cartWishItem = await db
        .get()
        .collection(collection.WISHLIST_COLLECTION)
        .aggregate([
          {
            $match: { user: ObjectId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              products: { $arrayElemAt: ["$products", 0] },
            },
          },
        ])
        .toArray();
      resolve(cartWishItem);
    });
  },
  getCartCount: (userId) => {
    return new Promise(async (resolve, reject) => {
      let count = 0;
      const cart = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .findOne({ user: ObjectId(userId) });

      if (cart) {
        count = cart.products.length;
      }
      resolve(count);
    });
  },
  changeProductQuantity: (details) => {
    details.count = parseInt(details.count);
    details.quantity = parseInt(details.quantity);
    return new Promise((resolve, reject) => {
      if (details.count == -1 && details.quantity == 1) {
        db.get()
          .collection(collection.CART_COLLECTION)
          .updateOne(
            { _id: ObjectId(details.cart) },
            {
              $pull: { products: { item: ObjectId(details.product) } },
            }
          )
          .then((response) => {
            resolve({ removeProduct: true });
          });
      } else {
        db.get()
          .collection(collection.CART_COLLECTION)
          .updateOne(
            {
              _id: ObjectId(details.cart),
              "products.item": ObjectId(details.product),
            },
            {
              $inc: { "products.$.quantity": details.count },
            }
          )
          .then((response) => {
            resolve({ status: true });
          });
      }
    });
  },

  getTotalAmount: (userId) => {
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .findOne({ user: ObjectId(userId) });

      if (userCart.products.length > 0) {
        const TotalAmount = await db
          .get()
          .collection(collection.CART_COLLECTION)
          .aggregate([
            {
              $match: { user: ObjectId(userId) },
            },

            {
              $unwind: "$products",
            },
            {
              $project: {
                item: "$products.item",
                quantity: "$products.quantity",
              },
            },

            {
              $lookup: {
                from: collection.PRODUCT_COLLECTION,
                localField: "item",
                foreignField: "_id",
                as: "products",
              },
            },
            {
              $project: {
                item: 1,
                quantity: 1,
                products: { $arrayElemAt: ["$products", 0] },
              },
            },
            {
              $group: {
                _id: "",
                total: {
                  $sum: {
                    $multiply: ["$quantity", "$products.Price"],
                  },
                },
              },
            },
          ])
          .toArray();

        response.TotalAmount = TotalAmount[0].total;

        resolve(response.TotalAmount);
      } else {
        response.TotalAmount = 0;
        resolve(response.TotalAmount);
      }
    });
  },

  subTotal: (userId) => {
    return new Promise(async (resovle, reject) => {
      const subTotal = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .aggregate([
          {
            $match: { user: ObjectId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              products: { $arrayElemAt: ["$products", 0] },
            },
          },
          {
            $project: {
              _id: 0,
              total: {
                $multiply: ["$quantity", "$products.Price"],
              },
            },
          },
        ])
        .toArray();
      response.subTotal = subTotal;
      resovle(subTotal);
    });
  },

  placeOrder: (order, total, userId) => {
    return new Promise(async (resolve, reject) => {
      let cartProducts = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .aggregate([
          {
            $match: { user: ObjectId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "products.item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",

              product: 1,
            },
          },
          {
            $project: {
              _id: 0,
              quantity: 1,
              productDetails: { $arrayElemAt: ["$product", 0] },
            },
          },
        ])
        .toArray();

      const TotalAmount = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .aggregate([
          {
            $match: { user: ObjectId(userId) },
          },

          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },

          {
            $lookup: {
              from: collection.PRODUCT_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              products: { $arrayElemAt: ["$products", 0] },
            },
          },
          {
            $group: {
              _id: "",
              total: {
                $sum: {
                  $multiply: ["$quantity", "$products.Price"],
                },
              },
            },
          },
        ])
        .toArray();

      let status = order["payment-method"] === "COD" ? "placed" : "pending";

      let orderObj = {
        userId: order.userId,
        status: status,
        deliveryDetails: {
          // name:order.name,
          // mobile:order.option1.mobile,
          address: order.option1,
          // pincode:order.option1.pincode,
          orderStatus: status,

          paymentMethod: order["payment-method"],
          date: new Date().toLocaleString(),
          expected_Date: new Date(+new Date() + 7 * 35 * 24 * 60 * 1000).toLocaleString(),
          products: cartProducts,

          TotalAmount: TotalAmount,
        },
      };

      db.get()
        .collection(collection.ORDER_COLLECTION)
        .insertOne(orderObj)
        .then((response) => {
          resolve(response);
        });
    });
  },
  getCartProductList: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cartProducts = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .findOne({ user: ObjectId(userId) });
      resolve(cartProducts.products);
    });
  },
  getPaymentMethod: (userId) => {
    return new Promise(async (resolve, reject) => {
      let paymentMethod = await db
        .get()
        .collection(collection.ORDER_COLLECTION)
        .findOne({ user: ObjectId(userId) });
      resolve(response);
    });
  },
  removeCartProduct: (details) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CART_COLLECTION)
        .updateOne({ _id: ObjectId(details) });
    });
  },

  deleteCartProducts: (item, userId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CART_COLLECTION)
        .updateOne(
          { user: ObjectId(userId) },
          { $pull: { products: { item: ObjectId(item) } } }
        )
        .then((response) => {
          resolve(response);
        });
    });
  },
};
