const mongoose = require('mongoose');

const { Schema } = mongoose;

const DrinksSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true,
    },
});

const Drink = mongoose.model('Drink', DrinksSchema);

module.exports = Drink;
