const router = require("express").Router();
const userRoutes = require("./userRoutes");
const accountRoutes = require("./accountRoutes");

router.use("/users", userRoutes);
router.use("/account", accountRoutes);

module.exports = router;
