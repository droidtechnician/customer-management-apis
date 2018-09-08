const signUpController = require('../controllers/signup.controller'),
    customerController = require('../controllers/customer.controller');

var routes = function(app) {

    app.route('/login')
        .post(signUpController.getUser);

    app.route('/signup')
        .post(signUpController.createUser);

    app.route('/customer/:custId?')
        .get(customerController.getAllCustomers)
        .post(customerController.createCustomer)
        .put(customerController.updateCustomer);

    app.route('/customers/:page')
        .get(customerController.getCustomersPage);

    app.route('/mock')
        .get(customerController.insertMockData);
}

module.exports = routes;