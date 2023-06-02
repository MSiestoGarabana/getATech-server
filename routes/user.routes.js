const router = require("express").Router();
const User = require('./../models/User.model')
const {
    getAllUsers,
    findUserById,
    editUser,
    deleteUser
} = require('../controllers/user.controllers')

router.get("/getAllUsers", getAllUsers)
router.get("/:_id", findUserById)
router.post("/:_id/edit", editUser)
router.post("/:_id/delete", deleteUser)

module.exports = router