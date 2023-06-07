const router = require('express').Router()
const Offer = require('./../models/Offer.model')
const { verifyToken } = require('../middlewares/verifyToken.middleware')



const getAllOffers = ("/getAllOffers", (req, res, next) => {
    Offer
        .find()
        .then(response =>  res.json(response))
        .catch(err => next(err))
})

const findOfferById = ("/:_id", (req, res, next) => {
    const { _id } = req.params

    Offer
        .findById(_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

const createOffer = ("/createOffer", verifyToken, (req, res, next) => {
    const {image, position, salary, location, remoteVolume, description, applicants, preselecteds, discardeds} = req.body
    const {_id: owner} = req.payload

    Offer
        .create({image, position, salary, location, remoteVolume, description, applicants, owner, preselecteds, discardeds})
        .then(response => res.json(response))
        .catch(err => next(err)) 
})

const newApplicant = ("/:_id/newApplicant", (req, res, next) => {

    const { _id  }= req.params
    const { user_id } = req.body

    Offer
        .findByIdAndUpdate(_id, { $addToSet: {applicants: user_id}}, {new : true})
        .then((response) => res.json(response))
        .catch(err =>next(err))

})

const newPreSelected = ("/:_id/newPreselected", (req, res, next) => {

    const { _id  }= req.params
    const { user_id } = req.body

    Offer
        .findByIdAndUpdate(_id, { $addToSet: {preselecteds: user_id}}, {new : true})
        .then((response) => res.json(response))
        .catch(err =>next(err))

})

const newDiscarded = ("/:_id/newDiscarded", (req, res, next) => {

    const { _id  }= req.params
    console.log("OFFER ID IN BACK",_id)
    const { user_id } = req.body
    console.log("DISCARDED ID IN BACK",user_id)

    Offer
        .findByIdAndUpdate(_id, { $addToSet: {discarded: user_id}}, {new : true})
        .then((response) => res.json(response))
        .catch(err =>next(err))

})

const newMatch = ("/:_id/newMatch", (req, res, next) => {

    const { _id  }= req.params
    const { user_id } = req.body

    Offer
        .findByIdAndUpdate(_id, { $addToSet: {matches: user_id}}, {new : true})
        .then((response) => res.json(response))
        .catch(err =>next(err))

})

const editOffer = ("/:_id/editOffer", (req, res, next) => {
    const {_id}  = req.params
    console.log("hey", _id)
    console.log("REQ BODYYYYYYYYYYY",req.body)
    console.log("NEWWWWW POSITION", req.body.position)
    const {image, position, salary, location, remoteVolume, description, applicants} = req.body
    
    Offer
        .findByIdAndUpdate(_id, {image, position, salary, location, remoteVolume, description, applicants},{ new:true})
        .then((response) => res.json(response))
        .catch(err => next(err))
    
})

const deleteOffer = ("/:_id/deleteOffer", (req, res, next) => {
    const _id = req.params

Offer
    .findByIdAndDelete(_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = {
    getAllOffers,
    findOfferById,
    createOffer,
    newApplicant,
    newPreSelected,
    newDiscarded,
    newMatch,
    editOffer,
    deleteOffer
}