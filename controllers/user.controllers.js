const router = require('express').Router()
const User = require('./../models/User.model')


const getAllUsers = ("/getAllUsers" , (req, res,next) => {
    User
    .find()
    // TODO: SELECCIONAR CAMPOS
    .then(response => res.json(response))
    .catch(err => next(err))
})
const findUserById = ("/:_id" , (req, res,next) => {
    const {_id} = req.params

    User
        .findById(_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})
const editUser = ("/:_id/edit" , (req, res,next) => {
    const {username, email, role} = req.body
    const {_id} = req.params

    User
        .findByIdAndUpdate(_id, {username, email, role})
        .then(response=> res.json({updatedUser: response.username, response}))
        .catch(err => next(err))
})
const deleteUser = ("/:_id/delete" , (req, res,next) => {
    const {_id} = req.params

    User
        .findByIdAndDelete(_id)
        .then(response => res.json({deletedUser: response.username, response}))
        .catch(err => next(err))
})


module.exports = {
    getAllUsers,
    findUserById,
    editUser,
    deleteUser
}