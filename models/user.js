const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username: { type: String,required: true,unique: true },
    password: { type: String,required: true },
    avatar:  { type: String, default: '' },
    // savedCard: [{type: mongoose.Schema.Types.ObjectId, ref: 'card'}]

})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel