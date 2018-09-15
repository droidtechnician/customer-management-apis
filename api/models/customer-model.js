'use strict'

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validate = require('validator'),
    uniqueValidator = require('mongoose-unique-validator'),
    autoIncrement = require('mongoose-auto-increment');

const CustomerSchema = new Schema({
    first_name: {
        type: String,
        minlength: [3, 'First Name should have minimum 3 characters'],
        required: 'First Name is mandatory'
    },
    last_name: {
        type: String,
        minlength: [3, 'Last Name should have minimum 3 characters'],
        required: 'Last Name is mandatory'
    },
    customer_id: {
        type: Number
    },
    email: {
        type: String,
        unique: 'Email ID must be unique',
        validate: [
            (value) => {
                return validate.isEmail(value);
            },
            "Is not a valid email"
        ]
    },
    gender: {
        type: String,
        enum: [
            'Male',
            'Female'
        ]
    },
    city: {
        type: String,
        minlength: [3, 'City name should be minimum 3 characters'],
        required: 'City name is required'
    },
    state: {
        type: String,
        required: 'State name is required'
    },
    streetAddress: {
        type: String
    },
    orders: {
        type: [Number]
    }
});

CustomerSchema.plugin(uniqueValidator, { message: 'This {PATH} is already registered' });
autoIncrement.initialize(mongoose.connection);
CustomerSchema.plugin(autoIncrement.plugin, {
    model: 'Customer',
    field: 'customer_id',
    startAt: 1
});

module.exports = mongoose.model('Customer', CustomerSchema);