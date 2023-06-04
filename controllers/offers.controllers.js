const router = require('express').Router()
const Offer = require('./../models/Offer.model')



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

const createOffer = ("/createOffer", (req, res, next) => {
    const {position, salary, location, remoteVolume, description} = req.body

    Offer
      .create({position, salary, location, remoteVolume, description})
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