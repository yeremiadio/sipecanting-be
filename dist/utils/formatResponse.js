"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const formatResponse = ({ data, statusCode, message }) => {
    return {
        statusCode,
        message,
        data,
    };
};
exports.formatResponse = formatResponse;
//# sourceMappingURL=formatResponse.js.map