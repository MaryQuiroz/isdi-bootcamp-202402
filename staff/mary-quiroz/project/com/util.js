"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractJwtPayload(token) {
    var _a = token.split('.'), payloadB64 = _a[1];
    var payloadJSON = atob(payloadB64);
    var payload = JSON.parse(payloadJSON);
    return payload;
}
var util = {
    extractJwtPayload: extractJwtPayload
};
exports.default = util;
