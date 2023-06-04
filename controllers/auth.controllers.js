const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken.middleware')
const User = require('./../models/User.model')
const bcrypt = require('bcryptjs')


const signUp = ('/signup', (req, res, next) => {

    const { username, email, password, role, image } = req.body
  
    User
      .findOne({ email })
      .then((foundUser) => {

        if (foundUser) {
          res.status(400).json({ message: "User already exists." })
          return
        }  
        return User.create({ email, password, username, role, image })

      })

      .then((createdUser) => {
  
        const { email, username, _id, role, image } = createdUser
        const user = { email, username, _id, role, image }
  
        res.status(201).json({ user })

      })

      .catch(err => {
        next(err)
      })

})

const login = ('/login', (req, res, next) => {

    const { email, password } = req.body;
  
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
    
        if (foundUser.validatePassword(password)) {
  
          const authToken = foundUser.signToken()
  
          res.json({ authToken: authToken });

        }
        else {

          res.status(401).json({ message: "Unable to authenticate the user" });

        }
    
      })
      .catch(err => next(err));
})

const verify = ('/verify', verifyToken, (req, res, next) => {
    res.status(200).json(req.payload)
})

module.exports = {
    signUp,
    login,
    verify
}