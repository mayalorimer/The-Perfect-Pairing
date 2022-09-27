//wine.js
const { Schema, model } = require('mongoose');

const wineSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    vineyard: {
        type: String,
        required: true,

    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2030
    },
    varietal:
    {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['red', 'white', 'sparkling', 'rose', 'dessert'],
        required: true,
    },
    blurb: {
        type: String,
        required: true,
    },
    // add relationship to food
    pairings: [
        {
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
        }
    ]

});

const Wine = model('Wine', wineSchema);

module.exports = Wine;