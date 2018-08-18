const signUpController = require('../controllers/signup.controller');

var routes = function(app) {
    
    app.route('/login')
        .get((req, res) => {
            res.send('Login Success');
        })
        .post(signUpController.createUser);
}

module.exports = routes;