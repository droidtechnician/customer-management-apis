module.exports = (data, res) => {
    const errors = [];
    if (data && data.errors) {
        for (let item in data.errors) {
            errors.push(new Error(item, data.errors[item]['message']));
        }
    }
    res.status(ERROR_CODES["BadRequest"]);
    return errors;
}

/*Error Class*/
class Error {
    constructor(name, errorMsg) {
        this.name = name;
        this.errorMsg = errorMsg;
    }
}

const ERROR_CODES = {
    "BadRequest": 400
}