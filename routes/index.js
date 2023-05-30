const router = require("express").Router();

router.use("/offers", require("./offers.routes"))

module.exports = router