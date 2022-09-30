//resolvers.js
const { AuthenticationError } = require('apollo-server-express');
const { User, Wine } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get the user
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // finding an array of wines based off the paramaters the user picks 
        getWine: async (parent, { type, minPrice, maxPrice }) => {
            const params = type ? type : "";
            let priceQuery = {};
            if (minPrice) {
                priceQuery = { ...priceQuery, $gte: minPrice };
            }
            if (maxPrice) {
                priceQuery = { ...priceQuery, $lte: maxPrice };
            }
            // return if only paramaters for price
            if (!type && minPrice) {
                return Wine.find({
                    price: { $gte: minPrice, $lte: maxPrice }
                });
            }
            // return if only parameters for type
            else if (!minPrice && type) {
                return Wine.find({ type });
            }
            // return if the user provides paramaters for type and price
            else {
                return Wine.find({
                    type: params,
                    $or: [{ price: { $gte: minPrice, $lte: maxPrice } }]
                })
            }
        },

        // get all of the wines
        wines: async (parent, args) => {
            return Wine.find()
        },

        // get one wine based on ID
        getOneWine: async (parent, { wineID }) => {
            return Wine.findOne({ _id: wineID });
        },
        // query for getting the wines that have a certain pairing based on category
        getPairing: async (parent, { pairingCategory }) => {
            // if they have a pairing that falls under the category include them
            return Wine.find({ pairingCategory: pairingCategory }); 
        }
    },

    Mutation: {
        // add a user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // login a user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

        // create a wine using the form
        createWine: async (parent, { name, vineyard, year, varietal, price, type, blurb }) => {

            // creates the new wine in the database
            const wine = await Wine.create({ name, vineyard, year, varietal, price, type, blurb });

            // adds the wine to the current users wine array
            //   await User.findOneAndUpdate (
            //    { _id: context.user._id},
            //     { $addToSet: { wine: wine._id }}
            //    )

            return wine;
        },

        // mutation for adding a new pairing
        addPairing: async (parent, { wineId, pairingName, pairingDescription, pairingCategory }) => {
            return Wine.findOneAndUpdate(
                { _id: wineId },
                {
                    $addToSet: { pairings: { pairingName, pairingDescription, pairingCategory } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }

    }
};
module.exports = resolvers;