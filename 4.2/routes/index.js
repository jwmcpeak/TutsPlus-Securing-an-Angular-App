var express = require("express");
var path = require('path');

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
    res.sendFile(getIndexPath());
});

/* GET login page. */
router.get("/login", function (req, res) {
    var file = getIndexPath();
    res.sendFile(file);
});

/* GET register page. */
router.get("/register", function (req, res) {
    res.sendFile(getIndexPath());
});

/* GET users page. */
router.get("/users", function (req, res) {
    res.sendFile(getIndexPath());
});

router.get("/favicon.ico", function(req, res) {
    res.statusCode = 404;
});

function getIndexPath() {
    return path.resolve("public/index.html");
}

module.exports = router;