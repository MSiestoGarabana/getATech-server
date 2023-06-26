const router = require("express").Router();
const {getAllOffers, getOffersByOwner, findOfferById, createOffer, newApplicant, newPreSelected, newDiscarded, newMatch, editOffer, deleteOffer} = require('../controllers/offers.controllers')
const { verifyToken } = require('../middlewares/verifyToken.middleware')

router.get("/getAllOffers", getAllOffers)
router.get("/:session_id/getOffersByOwner", getOffersByOwner )
router.get("/:_id", findOfferById)
router.post("/createOffer", verifyToken, createOffer)
router.post("/:_id/newApplicant", newApplicant)
router.post("/:_id/newPreselected", newPreSelected)
router.post("/:_id/newDiscarded", newDiscarded)
router.post("/:_id/newMatch", newMatch)
router.post("/:_id/editOffer", editOffer)
router.post("/:_id/deleteOffer", deleteOffer)

module.exports = router