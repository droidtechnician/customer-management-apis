const HTTP_ERROR_CODES = require('./enums/http-error-codes');

exports.errorProcessor = (data, res) => {
    const errors = [];
    if (data && data.errors) {
        for (let item in data.errors) {
            errors.push(new Error(item, data.errors[item]['message']));
        }
    }
    res.status(HTTP_ERROR_CODES.BADREQUEST);
    return errors;
}

exports.userUnauthorizedError = (res) => {
    const errors = [];
    errors.push(new Error("password", "Invalid Password"));
    res.status(HTTP_ERROR_CODES.UNAUTHORIZED);
    return errors
}

/*Error Class*/
class Error {
    constructor(name, errorMsg) {
        this.name = name;
        this.errorMsg = errorMsg;
    }
}