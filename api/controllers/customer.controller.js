const Customer = require('../models/customer-model'),
    errorProcessor = require('../../utilities/error-processors'),
    responseProcessor = require('../../utilities/response-processor'),
    formatData = require('../../utilities/format-data'),
    mockData = require('../../utilities/mock_data');

/**
 * creates customer
 */
exports.createCustomer = (req, res) => {
    if (req.body) {
        const customer = new Customer(req.body);
        customer.save((error, customer) => {
            if (error) res.send(errorProcessor.errorProcessor(error, res));
            else res.send(responseProcessor({ res: "Customer Created Successfully" }));
        });
    }
};

/**
 * get all customers
 */
exports.getAllCustomers = (req, res) => {
    const custId = req.params.custId;
    if (custId) {
        Customer.find({ customer_id: custId }, (error, customer) => {
            if (error) res.send(errorProcessor.errorProcessor(error, res));
            else {
                if (customer.length) {
                    res.status(200);
                    res.send({ data: formatData.formatData(customer[0]), resStatus: true });
                } else {
                    res.status(200);
                    res.send({ resStatus: false, errorMsg: 'No User found with this id' });
                }
            }
        });
    } else {
        Customer.find({}, (error, customers) => {
            if (error) res.send(errorProcessor.errorProcessor(error, res));
            else {
                res.status(200);
                res.send({ data: formatData.formatData(customers), resStatus: true });
            }
        });
    }
}

/**
 * get customers for pageNo
 */
exports.getCustomersPage = (req, res) => {
    const perPage = 10;
    const page = req.params.page || 1;

    Customer.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((error, customers) => {
            if (error) {
                res.status(400);
                res.send({ resStatus: false, errorMsg: error });
            } else {
                res.status(200);
                res.send({ resStatus: true, data: formatData.formatData(customers) });
            }
        });
}

/**
 * update a customer
 */
exports.updateCustomer = (req, res) => {
    const custId = req.params.custId;
    if (custId) {
        Customer.updateOne({ customer_id: custId }, req.body, (error, customer) => {
            if (error) res.send(errorProcessor.errorProcessor(error, res));
            else {
                if (customer.ok === 1) {
                    res.send({ resStatus: true, msg: 'Data modified successfully !!' });
                } else {
                    res.status(200);
                    res.send({ resStatus: false, errorMsg: 'No User found with this id' });
                }
            }
        })
    } else {
        res.status(400);
        res.send({ resStatus: false, errorMsg: 'Customer ID is required' });
    }
}

/**
 * insert mock data
 */
exports.insertMockData = (req, res) => {
    res.send('Done !!!');
    const tempMockData = mockData;
    for (let item of tempMockData) {
        let customer = new Customer(item);
        customer.save(customer);
    }
}