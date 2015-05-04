var mongoose = require("mongoose");
var Schema = mongoose.Schema;

function expireTime() {
    var now = new Date();
    
    now.setMinutes(now.getMinutes() + 5);
    
    return now.getTime();
}

// AccessToken
var AccessToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    expires: {
        type: Date,
        default: expireTime
    }
});

module.exports = mongoose.model("AccessToken", AccessToken);