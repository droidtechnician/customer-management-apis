'use strict';

const autoIncrement = require('mongoose-auto-increment'),
    CustomerModel = require('./customer-model'),
    mongoose = require('mongoose'),
    validators = require('validator'),
    Schema = mongoose.Schema;

const ItemSchema = new Schema({
    category: {
        type: String,
        enum: [
            'Footwear',
            'Sportswear',
            'Accessories',
            'Watches & Jewelry',
            'Traditional',
            'Luggage',
            'Sportswear'
        ],
        required: 'Category is required'
    },
    itemName: {
        type: String,
        required: 'Item name is required',
    },
    brand: {
        type: String,
        required: 'Brand is required',
        enum: [
            'Nike',
            'H&M',
            'Zara',
            'Adidas',
            'ARMANI',
            'FENDI',
            'HOUSE OF VERSACE',
            'BURBERRY',
            'RALPH LAUREN',
            'CHANEL',
            'PRADA',
            'HERMES'
        ]
    },
    qty: {
        type: Number,
        min: [1, 'Atleast one item should be added']
    },
    price: {
        type: Number,
        required: 'Price is mandatory'
    }
})

const OrderSchema = new Schema({
    orderNo: {
        type: Number
    },
    items: [
        ItemSchema
    ],
    customer_id: {
        type: Number,
        required: 'Order cannot be created without customer details',
        validate: {
            validator: (value) => {
                return new Promise((resolve, reject) => {
                    CustomerModel.find({ customer_id: value }, (error, cust) => {
                        if (error || !cust.length) reject(false);
                        else resolve(true);
                    })
                })
            },
            message: 'Customer with these details doesnot exist'
        }
    },
    totalAmount: {
        type: Number,
        required: 'Total amount cannot be empty',
        validate: {
            validator: (value) => {
                return new Promise((resolve, reject) => {
                    if (value > 0) resolve(true);
                    else reject(false);
                })
            }
        }
    }
});

autoIncrement.initialize(mongoose.connection);
OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderNo',
    startAt: 209468,
    incrementBy: 100
});

module.exports = mongoose.model('Order', OrderSchema);