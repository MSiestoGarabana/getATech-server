const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'User field cannot be empty '],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email field cannot be empty'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password field cannot be empty'],
      minlength: [4, 'Password must be, at least, 4 characters long']
    },
    role:{
      type: String,
      enum: ['EMPLOYEE', 'EMPLOYER', 'ADMIN'],
      default: 'EMPLOYEE'
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },

  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
 
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword
 
  next()
})

const User = model("User", userSchema);

module.exports = User;
