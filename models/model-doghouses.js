// model-doghouse.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const DoghouseSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'dogs'
    }]
}, {
    versionKey: false
});

module.exports = mongoose.model('doghouses', DoghouseSchema);