var express = require("express");
var passport = require("passport");
var crypto = require('crypto');
var User = require('../models/user');
var AccessToken = require('../models/accessToken');

var router = express.Router();

/* POST /login */
router.post("/login", function (req, res) {
    
    passport.authenticate("local", { session: false }, function (err, user, info) {
        if (user) {
            AccessToken.findOne({ userId: user.id }, function (err, token) {
                if (err) { return done(err); }
                //if (!token) { return done(null, false); }
                
                if (token) {
                    AccessToken.remove({ token: token.token }, function (err) {
                        if (err) return done(err);
                    });
                }

                var tokenValue = crypto.randomBytes(32).toString('base64');
                
                token = new AccessToken({
                     token: tokenValue, 
                     userId: user.id
                });
                
                token.save(function (err, token) {
                    if (err) { return done(err); }
                    
                    var tempUser = {
                        displayName : user.displayName,
                        isAdmin : user.isAdmin,
                        username : user.username,
                        token: tokenValue
                    };
                    
                    res.json(tempUser);
                    //done(null, tokenValue, refreshTokenValue, { 'expires_in': config.get('security:tokenLife') });
                });
            });
            
            
            
            //res.json(user);
        } else {
            res.statusCode = 400;
            
            if (info.message) {
                res.json(info);
            }
        }
    })(req, res);
});

router.get("/logout", function (req, res, next) {
    req.logout();
    next();
}, function (req, res) {
    res.statusCode = 200;
    res.end();
});

/* POST /register list */
router.post("/register", function (req, res) {
    
    var user = new User({
        username: req.body.username,
        displayName: req.body.name
    });
    
    User.register(user, req.body.password, function (err, account) {
        if (err) {
            res.statusCode = 400;
            res.json({ message: err.message });
            res.end();
            return;
        }
        
        req.login(account, { session: false }, function (err) {
            if (err) { return next(err); }

            AccessToken.findOne({ userId: user.id }, function (err, token) {
                if (err) { return done(err); }
                //if (!token) { return done(null, false); }
                
                if (token) {
                    AccessToken.remove({ token: token.token }, function (err) {
                        if (err) return done(err);
                    });
                }
                
                var tokenValue = crypto.randomBytes(32).toString('base64');
                
                token = new AccessToken({
                    token: tokenValue, 
                    userId: user.id
                });
                
                token.save(function (err, token) {
                    if (err) { return done(err); }
                    account.token = tokenValue;
                    res.json(account);
                });
            });
        });
    });
});

module.exports = router;