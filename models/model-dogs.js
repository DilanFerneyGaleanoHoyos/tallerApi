// model-dog.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const DogSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  doghouses: {
    type: mongoose.Types.ObjectId,
    ref: 'doghouses'
  }
}, {
  versionKey: false
});
module.exports = mongoose.model('dogs', DogSchema);