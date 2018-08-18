const signUpController = require('../controllers/signup.controller');

var routes = function(app) {
    
    app.route('/login')
        .get((req, res)=> {
            res.send("Apis up and running")
        })
        .post(signUpController.getUser);

    app.route('/signup')
        .post(signUpController.createUser);
}

module.exports = routes;