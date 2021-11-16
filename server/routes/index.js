var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {

    res.send("WELCOME TO HOME PAGE")
});

module.exports = router;