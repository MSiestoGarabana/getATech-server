const router = require("express").Router();
const Offer = require('./../models/Offer.model')
const {getAllOffers, findOfferById, createOffer, newApplicant, editOffer, deleteOffer} = require('../controllers/offers.controllers')
const { verifyToken } = require('../middlewares/verifyToken.middleware')

router.get("/getAllOffers", getAllOffers)
router.get("/:_id", findOfferById)
router.post("/createOffer", verifyToken, createOffer)
router.post("/:_id/newApplicant", newApplicant)
router.post("/:_id/editOffer", editOffer)
router.post("/:_id/deleteOffer", deleteOffer)

module.exports = router