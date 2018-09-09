const Order = require('../models/order-model'),
    errorProcessor = require('../../utilities/error-processors'),
    responseProcessor = require('../../utilities/response-processor'),
    formatData = require('../../utilities/format-data');

exports.createOrder = (req, res) => {
    const order = new Order(req.body);
    order.save((err, order) => {
        if (err) res.send(errorProcessor.errorProcessor(err, res));
        else res.send(responseProcessor({ res: "Order Created Successfully" }));
    });
}