const { AuthenticationError } = require('apollo-server-express');
const { User, Order, Item, Category } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('k_test_51MqfRXLKxBhs1x2ohImp5tfmxKnV9g1D9aptSYH23aU8snf1VIvrhBZ2XcXNfHLhrVqngQFe760FsHAk3P0a9cap00xNKg5A0S');

const resolvers = {
    Query: {
        allUsers: async () => {
            return await User.find();
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.items',
                    populate: 'category',
                    path: 'friends',
                    populate: 'firstName, lastName, avatar'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        categories: async () => {
            return await Category.find();
        },
        items: async (parent, Category, context) => {
            const params = Category ? { category: Category } : {};
            return await Item.find(params).populate('category');
        },
        item: async (parent, { _id }) => {
            return await Item.findById(_id).populate('category');
        },
        order: async (parent, {_id}, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.items',
                    populate: 'category'
                 });
                 return user.orders.id(_id);
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ items: args.items, drinks: args.drinks });
            const order_items = [];

            const { items } = await order.populate('items').execPopulate();

            for (let i = 0; i < items.length; i++) {
                const item = await stripe.products.create({
                    name: items[i].name,
                    description: items[i].description,
                    images: [`${url}/images/${items[i].image}`],
                });

                const price = await stripe.prices.create ({
                    product: product.id,
                    unit_amount: products[i].price *100,
                    currency: 'cad',
                });

                order_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                order_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect email');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return { token, user };
        },
        addOrder: async (parent, { items }, context) => {
            if (context.user) {
                const order = new Order({ items });
                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
                return order;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateItem: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
            return await Item.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        removeOrder: async (parent, { _id }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, { $pull: { orders: { _id } } });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
         if (context.user) {
             const updatedUser = await User.findByIdAndUpdate(
                 { _id: context.user._id },
                 { $addToSet: { friends: friendId } },
                 { new: true }
             ).populate('friends');
             return updatedUser;
             }
                throw new AuthenticationError('You need to be logged in!');
            },
        removeFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { friends: friendId } },
                    { new: true }
                ).populate('friends');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;