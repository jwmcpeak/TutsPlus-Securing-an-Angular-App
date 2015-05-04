var express = require("express");
var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
    User.find({}, function(err, users) {
        //var userMap = {};

        //users.forEach(function(user) {
        //    userMap[user._id] = user;
        //});

        res.send(users);
    });
});

module.exports = router;