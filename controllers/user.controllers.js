const router = require('express').Router()
const User = require('./../models/User.model')


const getAllUsers =  (req, res,next) => {
    User
    .find()
    .then(response => res.json(response))
    .catch(err => next(err))
}

const findUserById =  (req, res,next) => {
    const {_id} = req.params

    User
        .findById(_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const editUser =  (req, res,next) => {
    const {username, email, role} = req.body
    const {_id} = req.params

    User
        .findByIdAndUpdate(_id, {username, email, role})
        .then(response=> res.json({updatedUser: response.username, response}))
        .catch(err => next(err))
}

const deleteUser =  (req, res,next) => {
    const {_id} = req.params

    User
        .findByIdAndDelete(_id)
        .then(response => res.json({deletedUser: response.username, response}))
        .catch(err => next(err))
}


module.exports = {
    getAllUsers,
    findUserById,
    editUser,
    deleteUser
}