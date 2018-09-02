const User = require('../models/user-model'),
    errorProcessor = require('../../utilities/error-processors'),
    responseProcessor = require('../../utilities/response-processor');

exports.createUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.save((error, user) => {
        if (error) res.send(errorProcessor.errorProcessor(error, res));
        else res.send(responseProcessor({ res: "User Created Successfully" }));
    })
}

exports.getUser = (req, res) => {
    const signUp = new SignUpModel(req.body);
    User.find({ 'emailId': signUp.emailId }, (error, user) => {
        if (error) res.send(errorProcessor.errorProcessor(error, res));
        else {
            if (signUp.password === user[0].password) {
                res.send(responseProcessor(user[0], ['firstName', 'lastName'], 'No User found'));
            } else {
                res.send(errorProcessor.userUnauthorizedError(res));
            }
        }
    })
}

class SignUpModel {
    constructor(obj) {
        this.emailId = obj.emailId;
        this.password = obj.password;
    }
}