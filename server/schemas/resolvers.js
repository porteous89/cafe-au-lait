const { AuthenticationError } = require("apollo-server-express");
const { User, Order, Product, Category, VirtualTable, Message } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "k_test_51MqfRXLKxBhs1x2ohImp5tfmxKnV9g1D9aptSYH23aU8snf1VIvrhBZ2XcXNfHLhrVqngQFe760FsHAk3P0a9cap00xNKg5A0S"
);
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const NEW_MESSAGE = "NEW_MESSAGE";
const USER_LEAVED = "USER_LEAVE";
const USER_JOINED = "USER_JOINED";

const resolvers = {
  Query: {
    allMessages: async (parent, { tableId }, context) => {
      if (!tableId) {
        throw new Error("`tableId` is required");
      }
      return await Message.find({ table: tableId })
        .limit(30)
        .populate("table")
        .populate("from");
    },
    allUsers: async () => {
      return await User.find();
    },
    user: async (parent, args, context) => {
      console.log("tomas");
      console.log(context.user);
      if (context.user) {
        // const user = await User.findById(context.user._id).populate({
        //     path: 'orders',
        //     populate: 'category',
        //     path: 'friends',
        //     populate: 'firstName, lastName, avatar'
        // });
        const user = await User.findById(context.user._id).populate({
          path: "orders",
          populate: {
            path: "products",
          },
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        console.log(user.orders.length);
        console.log(user.orders);
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};
      if (category) {
        params.category = category;
      }
      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });
        return user.orders.id(_id);
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const order_items = [];

      const { products } = await order.populate("products").execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: items[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "cad",
        });

        order_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        order_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    allTables: async (parents, args) => {
      return await VirtualTable.find().populate("attendants");
    },
    table: async (parents, { _id }) => {
      return await VirtualTable.findById(_id).populate("attendants");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect email");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    removeOrder: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, {
          $pull: { orders: { _id } },
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId } },
          { new: true }
        ).populate("friends");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    joinTable: async (parent, { tableId, index }, context) => {
      if (context.user) {
        const table = await VirtualTable.findOne({ _id: tableId });
        seats = table.seats;
        if (!seats || seats.length === 0) {
          seats = [];
        }

        let indeces = seats.map((a) => a.index);
        if (indeces.indexOf(index) > 0) {
          //already taken
        }

        //we need to add code to it to hangle leave table and join this one.

        await VirtualTable.findOneAndUpdate(
          {
            seats: {
              $elemMatch: { user: context.user._id },
            },
          },
          { $pull: { seats: { user: context.user._id } } }
        );

        const updatedTable = await VirtualTable.findByIdAndUpdate(
          { _id: tableId },
          {
            $addToSet: { attendants: context.user._id },
            $addToSet: { seats: { index: index, user: context.user._id } },
          },
          { new: true }
        ).populate("attendants");

        // pobsub.publish("")
        return updatedTable;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    leaveTable: async (parent, { tableId }, context) => {
      if (context.user) {
        await VirtualTable.findOneAndUpdate(
          {
            seats: {
              $elemMatch: { user: context.user._id },
            },
          },
          { $pull: { seats: { user: context.user._id } } }
        );
        const updatedTable = await VirtualTable.findByIdAndUpdate(
          { _id: tableId },
          { $pull: { attendants: context.user._id } },
          { new: true }
        ).populate("attendants");
        return updatedTable;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addMessage: async (parent, { tableId, message }, context) => {
      if (context.user) {
        const messageToSave = await Message.create({
          message: message,
          table: tableId,
          from: context.user._id,
          date: new Date(),
        });
        pubsub.publish(NEW_MESSAGE, messageToSave);
        return messageToSave;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Subscription: {
    newMessage: {
      subcribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_MESSAGE),
    },

    userJoined: {
      subcribe: (_, __, { pubsub }) => pubsub.asyncIterator(USER_JOINED),
    },
    userLeaved: {
      subcribe: (_, __, { pubsub }) => pubsub.asyncIterator(USER_LEAVED),
    },
  },
};
module.exports = resolvers;