const mongoose = require('mongoose');
const Schema = mongoose.Schema();


const PostSchema = mongoose.Schema({

    title: {

        type: String,

    },
    status: {

        type: String,

    },

    likes:{
        type: Number,
        default: 0,

    },

})

module.exports = mongoose.model('posts', PostSchema);