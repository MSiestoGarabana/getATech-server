const router = require('express').Router()
const User = require('./../models/User.model')
const Offer = require ('./../models/Offer.model')


const getAllUsers =  (req, res,next) => {
    User
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getAvailableEmployees = (req, res, next) => {

    const {_id : user_id} = req.payload
    const {offer_id} = req.params

    console.log("userID", user_id, "offerID", offer_id)
    
    Promise.all([
        Offer.findById(offer_id),
        User.find({ role: "EMPLOYEE" })
      ])
        .then(([offer, users]) => {
          const preselectedArr = offer.preselecteds;
          const discardedArr = offer.discarded;
    
          const availableUsers = users.filter(user =>
            !preselectedArr.includes(user._id) &&
            !discardedArr.includes(user._id)
          );
    
          res.json(availableUsers);
        })
        .catch(err => next(err));
    
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
    getAvailableEmployees,
    findUserById,
    editUser,
    deleteUser
}