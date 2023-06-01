const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require("../middlewares/verifyToken.middleware");


router.post('/signup', (req, res, next) => {

    const { username, email, password, role } = req.body
  
    User
      .findOne({ email })
      .then((foundUser) => {

        if (foundUser) {
          res.status(400).json({ message: "User already exists." })
          return
        }  
        return User.create({ email, password, username, role })

      })

      .then((createdUser) => {
  
        const { email, username, _id } = createdUser
        const user = { email, username, _id }
  
        res.status(201).json({ user })

      })

      .catch(err => {
        next(err)
      })

  })


router.post('/login', (req, res, next) => {

  
  const { email, password } = req.body;
  console.log("ME LOGUEO DESDE EL SIGNUP FORM-------------auth.routes, REQ.BODY",req.body)
  
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
  
  User
    .findOne({ email })
    .then((foundUser) => {
  
      if (!foundUser) {
        res.status(401).json({ message: "User not found." })
        return;
      }
      console.log("aquí llego")
  
      if (bcrypt.compareSync(password, foundUser.password)) {

        const { _id, email, username } = foundUser;

        const payload = { _id, email, username }

        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        )

        res.json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
  
    })
    .catch(err => next(err));
})

router.get('/verify', isAuthenticated, (req, res, next) => {
  console.log('AAAAAAUTH.ROUTES.JS EL USUARIO TIENE UN TOKEN CORRECTO Y SUS DATOS SON', req.payload)

  res.status(200).json(req.payload)
})

module.exports = router