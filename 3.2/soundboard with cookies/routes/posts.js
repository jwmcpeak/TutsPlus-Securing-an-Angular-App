var express = require("express");
var router = express.Router();
var passport = require("passport");
var passport = require("passport");

var Post = require("../models/post");

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.statusCode = 401;
};

/* GET /posts list */
router.get("/", /*passport.authenticate("bearer", {session: false}),*/ function (req, res) {
    Post.find({}, function (err, posts) {

        
        res.json(posts);
    });
    
    //res.setHeader('Content-Type', 'application/json');
    //res.json(returnData);
});

/* GET /posts/id */
router.get("/:id", function (req, res, next) {
    var obj = {
        id: req.params.id
    };

    Post.findById(req.params.id, function (err, post) {
        if (err) {
            res.statusCode = 400;
            res.json({ message: "Something went wrong." });
            return;
        }

        if (!post) {
            res.statusCode = 404;
            return;
        }

        res.json(post);
    });
});

/* POST /posts */
router.post("/", isAuthenticated, function (req, res) {
    var user = req.user;

    var post = new Post({
        title: req.body.title, 
        message: req.body.message,
        username: user.username,
        displayName: user.displayName
    });

    post.save(function (err, post) {
        if (err) {
            res.statusCode = 400;
            res.json({ message: "Something went wrong." });
            return;
        }

        res.statusCode = 201;
        res.json(post);
    });
});

/* PUT /posts */
router.put("/", isAuthenticated, function (req, res) {
    Post.findById(req.body.id, function (err, post) {
        if (err || !post) {
            res.statusCode = 400;
            res.json({ message: "Something went wrong." });
            return;
        }

        post.title = req.body.title;
        post.message = req.body.message;
        
        post.save(function (err, post) {
            if (err) {
                res.statusCode = 400;
                res.json({ message: "Something went wrong." });
                return;
            }
            
            res.statusCode = 201;
            res.json(post);
        });
    });
});

module.exports = router;