const router = require("express").Router();
const Offer = require('./../models/Offer.model')

router.get("/getAllOffers", (req, res, next) => {

  Offer
    .find()
    .select({
      image:1,
      logo:1,
      position:1,
      salary:1,
      location:1,
      remoteVolume:1,
      description:1
    })
    .then(response =>  res.json(response))
    .catch(err => next(err))
})


router.get("/:_id", (req, res, next) => {

  const { _id } = req.params

  Offer
    .findById(_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/createOffer", (req, res, next) => {

  const {position, salary, location, remoteVolume, description} = req.body

  Offer
    .create({position, salary, location, remoteVolume, description})
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post("/:_id/editOffer", (req, res, next) => {
  const _id = req.params
  const {image, position, salary, location, remoteVolume, description,applicants} = req.body

  Offer
  .findByIdAndUpdate(_id, {image, position, salary, location, remoteVolume, description, applicants})
  .then((response) => {res.json(response)})
  .catch(err => next(err))
})

router.post("/:_id/deleteOffer", (req, res, next) => {
  const _id = req.params

  Offer
  .findByIdAndDelete(_id)
  .then(response => res.json(response))
  .catch(err => next(err))
})

module.exports = router