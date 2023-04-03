const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    table: {
        type: Schema.Types.ObjectId,
        ref: 'VirtualTable'
    },
    date: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true,
    }
});


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;