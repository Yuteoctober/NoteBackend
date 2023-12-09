const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    color: { type: String },
    x: { type: Number, default: 0},
    y: { type: Number, default: 0 },
    created: { type: Date, default: Date.now},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
   
});

const CardModel = mongoose.model('Card', CardSchema);

module.exports = CardModel;