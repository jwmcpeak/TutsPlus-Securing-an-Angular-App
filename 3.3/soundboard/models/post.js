var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Post = new Schema({
    title: String,
    message: String,
    username: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    displayName: String
});

module.exports = mongoose.model("Post", Post);