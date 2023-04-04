const express = require("express");
const ItemRoute = require("./item-route");
const router = express.Router();

router.use("/item", ItemRoute);

module.exports = router;