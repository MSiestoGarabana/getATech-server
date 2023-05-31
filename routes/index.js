const router = require("express").Router();

router.use("/offers", require("./offers.routes"))
router.use("/auth", require('./auth.routes'))

module.exports = router