const express = require("express");
const ItemRoute = require("./item-route");
const UserRoute = require("./user-route");
const router = express.Router();

router.use("/item", ItemRoute);
router.use("/user", UserRoute);

module.exports = router;