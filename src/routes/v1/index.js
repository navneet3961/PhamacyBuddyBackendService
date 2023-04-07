const express = require("express");
const ItemRoute = require("./item-route");
const UserRoute = require("./user-route");
const CartRoute = require("./cart-route");
const router = express.Router();

router.use("/item", ItemRoute);
router.use("/user", UserRoute);
router.use("/cart", CartRoute);

module.exports = router;