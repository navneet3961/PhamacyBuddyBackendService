const express = require("express");
const ItemRoute = require("./item-route");
const UserRoute = require("./user-route");
const CartRoute = require("./cart-route");
const AddressRoute = require("./address-route");
const OrderRoute = require("./order-route");
const router = express.Router();
const { ValidationMiddleware } = require("../../middlewares/index");

router.use("/item", ItemRoute);
router.use("/user", UserRoute);
router.use("/cart", ValidationMiddleware.validUser, CartRoute);
router.use("/address", ValidationMiddleware.validUser, AddressRoute);
router.use("/order", ValidationMiddleware.validUser, OrderRoute);

module.exports = router;