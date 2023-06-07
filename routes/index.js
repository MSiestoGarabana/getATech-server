const router = require('express').Router();
// TODO: DESACOPLAR CORRECTAMENTE CONTROLADORES
router.use('/offers', require('./offers.routes'))
router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/upload', require('./upload.routes'))

module.exports = router