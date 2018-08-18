const User = require('../models/user-model');
const errorProcessor = require('../../utilities/error-processors');

exports.createUser = (req, res)=> {
    const newUser = new User(req.body);
    newUser.save((error, user) => {
        if (error) res.send(errorProcessor(error, res));
        else res.send({res: "User Created Successfully"})
    })
}
