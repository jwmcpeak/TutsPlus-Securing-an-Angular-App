var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
var passport = require("passport");

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/views/admin/*", passport.authenticate("bearer", {session: false}), 
function(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.statusCode = 401;
        res.json({message: "nope"});
    }
});

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

var LocalStrategy = require("passport-local").Strategy;
var BearerStrategy = require("passport-http-bearer");

var User = require("./models/user");
var AccessToken = require("./models/accessToken");

var accessTokenStrategy = new BearerStrategy(
    function (accessToken, done) {
        AccessToken.findOne({ token: accessToken }, function (err, token) {
            if (err) { return done(err); }
            if (!token) { return done(null, false); }
            
            // expires in 2 hour
            if (Math.round((token.expires - token.created) / 1000) > 7200) {
                AccessToken.remove({ token: accessToken }, function (err) {
                    if (err) return done(err);
                });
                return done(null, false, { message: 'Token expired' });
            }
            
            User.findById(token.userId, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user' }); }
                
                var info = { scope: '*' }
                done(null, user, info);
            });
        });
    });

passport.use(new LocalStrategy(User.authenticate()));
passport.use(accessTokenStrategy);

mongoose.connect("mongodb://localhost/soundboard", function (err) {
    if (err) {
        console.log("Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!");
    }
});

// configure routes
var staticRoutes = require("./routes/index");
var posts = require("./routes/posts");
var users = require("./routes/users");
var account = require("./routes/account");

app.use("*", function(req, res, next) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
});

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/account", account);
app.use("/", staticRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});


var port = 1337;
app.listen(port);
console.log("Soundboard listening on port " + port);
//module.exports = app;
