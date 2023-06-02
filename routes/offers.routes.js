const router = require("express").Router();
const Offer = require('./../models/Offer.model')
const {getAllOffers, findOfferById, createOffer, editOffer, deleteOffer} = require('../controllers/offers.controllers')

router.get("/getAllOffers", getAllOffers)
router.get("/:_id", findOfferById)
router.post("/createOffer", createOffer)
router.post("/:_id/editOffer", editOffer)
router.post("/:_id/deleteOffer", deleteOffer)

module.exports = router