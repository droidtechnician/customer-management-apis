'use strict'

var ERROR;
(function(ERROR) {
    ERROR['BADREQUEST'] = 400;
    ERROR['UNAUTHORIZED'] = 401;
    ERROR['SERVERERROR'] = 500;
})(ERROR || (ERROR = {}));

module.exports = ERROR;