var express = require("express");
var User = require('../models/user');
var passport = require("passport");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {   
    User.find({}, "username displayName isAdmin", function(err, users) {
        //var userMap = {};

        //users.forEach(function(user) {
        //    userMap[user._id] = user;
        //});

        res.send(users);
    });
});

module.exports = router;