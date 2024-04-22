"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var util_1 = require("./util");
var DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;
var URL_REGEX = /^(http|https):\/\//;
var validate = {
    text: function (text, explain, checkEmptySpaceInside) {
        if (typeof text !== 'string')
            throw new TypeError(explain + ' ' + text + ' is not a string');
        if (!text.trim().length)
            throw new errors_1.ContentError(explain + ' >' + text + '< is empty or blank');
        if (checkEmptySpaceInside)
            if (text.includes(' '))
                throw new errors_1.ContentError(explain + ' ' + text + ' has empty spaces');
    },
    date: function (date, explain) {
        if (typeof date !== 'string')
            throw new TypeError(explain + ' ' + date + ' is not a string');
        if (!DATE_REGEX.test(date))
            throw new errors_1.ContentError(explain + ' ' + date + ' does not have a valid format');
    },
    email: function (email, explain) {
        if (explain === void 0) { explain = 'email'; }
        if (!EMAIL_REGEX.test(email))
            throw new errors_1.ContentError("".concat(explain, " ").concat(email, " is not an email"));
    },
    password: function (password, explain) {
        if (explain === void 0) { explain = 'password'; }
        if (!PASSWORD_REGEX.test(password))
            throw new errors_1.ContentError("".concat(explain, " is not acceptable"));
    },
    url: function (url, explain) {
        if (!URL_REGEX.test(url))
            throw new errors_1.ContentError(explain + ' ' + url + ' is not an url');
    },
    callback: function (callback, explain) {
        if (explain === void 0) { explain = 'callback'; }
        if (typeof callback !== 'function')
            throw new TypeError("".concat(explain, " is not a function"));
    },
    token: function (token, explain) {
        if (explain === void 0) { explain = 'token'; }
        if (typeof token !== 'string')
            throw new TypeError("".concat(explain, " is not a string"));
        var exp = util_1.default.extractJwtPayload(token).exp;
        if (exp * 1000 < Date.now())
            throw new errors_1.UnauthorizedError('session expired');
    }
};
exports.default = validate;
