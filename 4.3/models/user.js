var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    displayName: String,
    isAdmin: Boolean
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

User.virtual("token").set(function(token) {
    this._token = token;
}).get(function() { return this._token; });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);