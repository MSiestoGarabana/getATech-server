const { Schema, model } = require("mongoose");

const offerSchema = new Schema(
  {
    image: {
      type: String,
      required: false,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    logo: {
        type: String,
        required: false,
        default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    position:  {
        type: String,
        required: [true, "Position field cannot be empty"]
    },
    salary: {
        type: String,
        required: [true, "Salary field cannot be empty"]
    }, // "min-max$"
    location: {
        type: String,
        required: [true, "Location field cannot be empty"]
    },
    remoteVolume: { 
        type: Number,
        required: [true, "Remote field cannot be empty"]
    }, //"50%"
    description: {
        type: String,
        required: false,
    },
    applicants: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref:'User'
    }
  },
  {
    timestamps: true
  }
);

const Offer = model("Offer", offerSchema);

module.exports = Offer;