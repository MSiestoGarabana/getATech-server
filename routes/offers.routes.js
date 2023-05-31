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


router.get("/getOneOffer/:offer_id", (req, res, next) => {

  const { offer_id } = req.params

  Offer
    .findById(offer_id)
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

module.exports = router