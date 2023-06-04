const router = require('express').Router()
const Offer = require('./../models/Offer.model')
const { verifyToken } = require('../middlewares/verifyToken.middleware')



const getAllOffers = ("/getAllOffers", (req, res, next) => {
    Offer
    .find()
    .select({applicants: 0 })
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
    const {image, position, salary, location, remoteVolume, description, applicants} = req.body
    const {_id: owner} = req.payload

    Offer
      .create({image, position, salary, location, remoteVolume, description, applicants, owner})
      .then(response => res.json(response))
      .catch(err => next(err)) 
})

const editOffer = ("/:_id/editOffer", (req, res, next) => {
    const _id = req.params
  const {image, position, salary, location, remoteVolume, description, applicants} = req.body

  Offer
  .findByIdAndUpdate(_id, {image, position, salary, location, remoteVolume, description, applicants})
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
    editOffer,
    deleteOffer
}