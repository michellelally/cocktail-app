var express = require("express");
var router = express.Router();

router.get("/recommendations", function(req, res, next) {

    res.send("WELCOME TO recommendations PAGE")
});

module.exports = router;