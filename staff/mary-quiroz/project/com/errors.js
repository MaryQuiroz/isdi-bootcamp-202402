"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.CredentialsError = exports.DuplicityError = exports.SystemError = exports.ContentError = void 0;
function buildErrorClass(name) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(message) {
            var _this = _super.call(this, message) || this;
            _this.name = name;
            return _this;
        }
        Object.defineProperty(class_1, "name", {
            // @ts-ignore
            get: function () {
                return name;
            },
            enumerable: false,
            configurable: true
        });
        return class_1;
    }(Error));
}
var ContentError = buildErrorClass('ContentError');
exports.ContentError = ContentError;
var SystemError = buildErrorClass('SystemError');
exports.SystemError = SystemError;
var DuplicityError = buildErrorClass('DuplicityError');
exports.DuplicityError = DuplicityError;
var CredentialsError = buildErrorClass('CredentialsError');
exports.CredentialsError = CredentialsError;
var NotFoundError = buildErrorClass('NotFoundError');
exports.NotFoundError = NotFoundError;
var UnauthorizedError = buildErrorClass('UnauthorizedError');
exports.UnauthorizedError = UnauthorizedError;
var errors = {
    ContentError: ContentError,
    SystemError: SystemError,
    DuplicityError: DuplicityError,
    CredentialsError: CredentialsError,
    NotFoundError: NotFoundError,
    UnauthorizedError: UnauthorizedError
};
exports.default = errors;
