const router = require('express').Router()
const Offer = require('./../models/Offer.model')
const { verifyToken } = require('../middlewares/verifyToken.middleware')



const getAllOffers =  (req, res, next) => {

    Offer
        .find()
        // TODO: REVisar oportunidades de seleccionar campos
        // .select({name: 1})
        .then(response =>  res.json(response))
        .catch(err => next(err))
}

const findOfferById =  (req, res, next) => {
    const { _id } = req.params

    Offer
        .findById(_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const createOffer =  (req, res, next) => {
    const {image, position, salary, location, remoteVolume, description, applicants, preselecteds, discardeds} = req.body
    const {_id: owner} = req.payload

    Offer
        .create({image, position, salary, location, remoteVolume, description, applicants, owner, preselecteds, discardeds})
        .then(response => res.json(response))
        .catch(err => next(err)) 
}

const newApplicant =  (req, res, next) => {

    const { _id  }= req.params
    const { user_id } = req.body

    Offer
        .findByIdAndUpdate(_id, { $addToSet: {applicants: user_id}}, {new : true})
        .then((response) => res.json(response))
        .catch(err =>next(err))

}

const newPreSelected =  (req, res, next) => {

    const { _id  }= req.params
    const { user_id } = req.body

    Offer
        .findByIdAndUpdate(_id, { $addToSet: {preselecteds: user_id}}, {new : true})
        .then((response) => res.json(response))
        .catch(err =>next(err))

}

const newDiscarded =  (req, res, next) => {

    const { _id  }= req.params
    const { user_id } = req.body

    Offer
        .findByIdAndUpdate(_id, { $addToSet: {discarded: user_id}}, {new : true})
        .then((response) => res.json(response))
        .catch(err =>next(err))

}

const newMatch =  (req, res, next) => {

    const { _id  }= req.params
    const { user_id } = req.body

    Offer
        .findByIdAndUpdate(_id, { $addToSet: {matches: user_id}}, {new : true})
        .then((response) => res.json(response))
        .catch(err =>next(err))

}

const editOffer =  (req, res, next) => {
    const {_id}  = req.params
    const {image, position, salary, location, remoteVolume, description, applicants} = req.body
    
    Offer
        .findByIdAndUpdate(_id, {image, position, salary, location, remoteVolume, description, applicants},{ new:true})
        .then((response) => res.json(response))
        .catch(err => next(err))
    
}

const deleteOffer =  (req, res, next) => {
    const {_id} = req.params

    Offer
        .findByIdAndDelete(_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

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