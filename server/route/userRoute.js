'use strict';
// var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {
    var userHandlers = require('../controller/userController');
    // todoList Routes
    app.route('/profile')
        .post(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register')
        .post(userHandlers.register);
   app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
};