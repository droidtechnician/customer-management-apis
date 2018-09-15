const Order = require('../models/order-model'),
    Customer = require('../models/customer-model'),
    errorProcessor = require('../../utilities/error-processors'),
    responseProcessor = require('../../utilities/response-processor'),
    formatData = require('../../utilities/format-data');

exports.createOrder = (req, res) => {
    const order = new Order(req.body);
    order.save((err, orderUni) => {
        if (err) res.send(errorProcessor.errorProcessor(err, res));
        else {
            Customer.updateOne({ 'customer_id': orderUni.customer_id }, { orders: orderUni.orderNo },
                (err, updatedCust) => {
                    if (err && !updatedCust.length) res.send(errorProcessor.errorProcessor(err, res));
                    else res.send(responseProcessor({ res: "Order Created Successfully" }));
                });
        }
    });
}

exports.getOrder = (req, res) => {
    Order.find({}, (error, orders) => {
        if (error) res.send(errorProcessor.errorProcessor(error, res));
        else {
            const responseData = [];
            const resStatus = false;
            for (let order of orders) {
                const itemsList = [];
                for (let item of order.items) {
                    const tempData = formatData.formatData(item);
                    itemsList.push(tempData);
                }
                // order.items = itemsList;
                const newOrder = JSON.parse(JSON.stringify(order));
                newOrder.items = itemsList;
                responseData.push(formatData.formatData(newOrder));
            }
            if (!responseData.length) resStatus = false;
            else resStatus = true;
            res.send({ resStatus: resStatus, data: responseData });
        }
    })
}