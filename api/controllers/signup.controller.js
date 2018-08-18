const User = require('../models/user-model'),
    errorProcessor = require('../../utilities/error-processors'),
    responseProcessor = require('../../utilities/response-processor');

exports.createUser = (req, res)=> {
    const newUser = new User(req.body);
    newUser.save((error, user) => {
        if (error) res.send(errorProcessor(error, res));
        else res.send({res: "User Created Successfully"})
    })
}

exports.getUser = (req, res) => {
    const signUp = new SignUpModel(req.body);
    User.find({'emailId': signUp.emailId}, (error, user) => {
        if (error) res.send(errorProcessor(error, res));
        else res.send(responseProcessor(user[0], ['firstName', 'lastName'], 'No User found' ));
    })
}

class SignUpModel {
    constructor (obj) {
        this.emailId = obj.emailId;
        this.password = obj.password;
    }
}
