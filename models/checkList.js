const mongoose = require('mongoose');

const CheckListSchema = new mongoose.Schema({
    checklist1: { type: String },
    checklist2: { type: String },
    checklist3: { type: String },
    checklist4: { type: String },
    checklist5: { type: String },
    done1: { type: Boolean, default: false},
    done2: { type: Boolean, default: false},
    done3: { type: Boolean, default: false},
    done4: { type: Boolean, default: false},
    done5: { type: Boolean, default: false},
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

const CheckListModel = mongoose.model('CheckList', CheckListSchema);

module.exports = CheckListModel;