var express = require("express");
var User = require('../models/user');
var passport = require("passport");
var router = express.Router();

/* GET users listing. */
router.get("/", passport.authenticate("bearer", { session: false }), function (req, res) {
    if (!req.user.isAdmin) {
        res.statusCode = 401;
        res.json({message: "Nope"});
        return;
    }
    
    User.find({}, "username displayName isAdmin", function(err, users) {
        //var userMap = {};

        //users.forEach(function(user) {
        //    userMap[user._id] = user;
        //});

        res.send(users);
    });
});

module.exports = router;