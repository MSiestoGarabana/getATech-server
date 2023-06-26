const router = require("express").Router();
const User = require('./../models/User.model');
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const {
    getAllUsers,
    getAvailableEmployees,
    findUserById,
    editUser,
    deleteUser
} = require('../controllers/user.controllers')

router.get("/getAllUsers", getAllUsers)
router.get("/:offer_id/getAvailableEmployees", verifyToken, getAvailableEmployees)
router.get("/:_id", findUserById)
router.post("/:_id/edit", editUser)
router.post("/:_id/delete", deleteUser)

module.exports = router