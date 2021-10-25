const mongoose = require("mongoose");
const postScheme = new mongoose.Schema({

    postDetail : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

module.exports.postModel = mongoose.model('Post', postScheme);