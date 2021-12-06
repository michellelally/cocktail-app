'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken");

const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongoURI = process.env.MONGODB_URI;

var mongoDB = 'mongodb+srv://test:test@cluster0.1xu2w.mongodb.net/harrys?retryWrites=true&w=majority'

//connecting to the database
mongoose.connect(mongoDB);

mongoose.connection.on('connected', () => {
    console.log("CONNECTION SUCCESSFUL")
})

mongoose.connection.on('error', (err) => {
    console.log("ERROR: ", err)
})

var User = require('./model/userModel');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});
var routes = require('./route/userRoute');
routes(app);

app.use(function (req, res) {
    return res.status(404).json({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;