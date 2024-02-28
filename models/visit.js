const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    name: { type: String },
    visit: { type: Number, default: 0 }
});

const VisitModel = mongoose.model('Visit', VisitSchema);

module.exports = VisitModel;
