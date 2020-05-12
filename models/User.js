const mongoose = require('mongoose');
const Schema = mongoose.Schema();


const UserSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3


    },

    password: {
        type: String,
        required: true,
        minlength: 3

    },
    name: {
        type: String,
        required: true,
        minlength: 3

    },

})

module.exports = mongoose.model('users', UserSchema);