const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Item, Drinks, Category } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('k_test_51MqfRXLKxBhs1x2ohImp5tfmxKnV9g1D9aptSYH23aU8snf1VIvrhBZ2XcXNfHLhrVqngQFe760FsHAk3P0a9cap00xNKg5A0S');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.items, orders.drinks',
                    populate: 'category'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        categories: async () => {
            return await Category.find();
        },
        
    }
}