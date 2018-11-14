const
async = require('async'),
    Order = require('../models/order-model'),
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
            let resStatus = false;
            async.eachOfSeries(orders, (order, key, callback) => {
                const itemsList = [];
                for (let item of order.items) {
                    const tempData = formatData.formatData(item);
                    itemsList.push(tempData);
                }
                const newOrder = JSON.parse(JSON.stringify(order));
                newOrder.items = itemsList;
                newOrder.itemCount = itemsList.length || 0;
                Customer.find({ customer_id: order.customer_id }, (error, cust) => {
                    if (cust) newOrder.custName = `${cust[0].first_name} ${cust[0].last_name}`;
                    responseData.push(formatData.formatData(newOrder));
                    callback();
                });
            }, () => {
                if (!responseData.length) resStatus = false;
                else resStatus = true;
                res.send({ resStatus: resStatus, data: responseData });
            })
        }
    })
}