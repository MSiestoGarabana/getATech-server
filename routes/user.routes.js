const router = require("express").Router();
const User= require('./../models/User.model')

router.post("/:_id/edit", (req, res, next) => {
    const {_id} = req.params
    User.findByIdAndUpdate()
})

router.post("/:_id/delete", (req,res,next) => {
    const {_id} = req.params
    User.findByIdAndDelete(_id)
    .then(response => res.json({deletedUser: response.username, response}))
    .catch(err => next(err))
})

module.exports = router