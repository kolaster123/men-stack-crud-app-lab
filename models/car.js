const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String,  },
  model: { type: String, },
  year: { type: Number,  },
  price: Number,
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
