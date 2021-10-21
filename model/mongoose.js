const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    about :String

})
userSchema.methods.savePass = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString('hex');
}
userSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 
module.exports.userModel = mongoose.model("User", userSchema);