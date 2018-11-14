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
    const data = req.body;
    if (data.password !== undefined && data.emailId !== undefined) {
        const signUp = new SignUpModel(data);
        User.find({ 'emailId': signUp.emailId }, (error, user) => {
            if (error) res.send(errorProcessor.errorProcessor(error, res));
            else {
                const response = responseProcessor(user[0], ['firstName', 'lastName'], 'No User found');
                if (!response.resStatus) res.send(response);
                else {
                    if (user[0].password === signUp.password) {
                        res.send(response);
                    } else {
                        res.send(errorProcessor.userUnauthorizedError(res));
                    }
                }
            }
        })
    } else {
        res.send("No Body found");
    }
}

class SignUpModel {
    constructor(obj) {
        this.emailId = obj.emailId;
        this.password = obj.password;
    }
}