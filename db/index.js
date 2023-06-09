const mongoose = require("mongoose");

require('dotenv').config();

const MONGO_URI =
  process.env.MONGODB_URI 



mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected the Database: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


