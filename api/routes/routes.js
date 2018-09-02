const signUpController = require('../controllers/signup.controller');

var routes = function(app) {
    
    app.route('/login')
        .post(signUpController.getUser);

    app.route('/signup')
        .post(signUpController.createUser);
}

module.exports = routes;