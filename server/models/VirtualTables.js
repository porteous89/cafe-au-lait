const mongoose = require('mongoose');
const { Schema } = mongoose;

const virtualTableSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    attendants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
capacity: {
        type: Number,
        required: true,
    },
});

const VirtualTable = mongoose.model('VirtualTable', virtualTableSchema);

module.exports = VirtualTable;