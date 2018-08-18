'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validate = require('validator');

var UserSchema = new Schema({
    firstName: {
        type: String,
        minlength: [3, 'First Name should have minimum 3 characters'],
        maxlength: [12, 'First Name should have maximum 12 characters'],
        required: 'First Name is mandatory'
    },
    lastName: {
        type: String,
        minlength: [3, 'Last Name should have minimum 3 characters'],
        maxlength: [12, 'Last Name should have maximum 12 characters'],
        required: 'Last Name is mandatory'
    },
    emailId: {
        type: String,
        required: 'Email Id is mandatory',
        unique: true,
        validate: [
            (value) => {
                return validate.isEmail(value);
            },
            "Is not a valid email"
        ]
    },
    password: {
        type: String,
        required: 'Password is mandatory'
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);