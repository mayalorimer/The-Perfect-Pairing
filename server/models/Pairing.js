//Pairing.js
const { Schema, model } = require('mongoose');
const Wine = require('./Wine');

const pairingSchema = new Schema({
    pairingName: {
        type: String,
        required: true,
    },
    pairingDescription: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    pairingCategory: {
        type: String,
        enum: ['Meat', 'Fish', 'Vegetarian', 'Cheese', 'Pizza/Pasta', 'Dessert', 'Other'],
        required: true,
    }


});

const Pairing = model('Pairing', pairingSchema);

module.exports = Pairing;