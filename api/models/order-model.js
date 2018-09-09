'use strict';

const autoIncrement = require('mongoose-auto-increment'),
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
    }
})

const OrderSchema = new Schema({
    orderNo: {
        type: Number
    },
    items: [
        ItemSchema
    ]
});

autoIncrement.initialize(mongoose.connection);
OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'orderNo',
    startAt: 209468,
    incrementBy: 100
});

module.exports = mongoose.model('Order', OrderSchema);