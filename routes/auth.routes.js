const router = require("express").Router();

const { verifyToken } = require("../middlewares/verifyToken.middleware");
const {signUp, login, verify} = require ("../controllers/auth.controllers")

router.post('/signup', signUp)
router.post('/login', login)
router.get('/verify', verifyToken, verify)

module.exports = router