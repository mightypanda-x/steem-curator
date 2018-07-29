"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var RETRIEVE_PROJECTS_URL = "https://utopian.rocks/api/posts?status=pending";
function retrievePendingPosts(SCZAccessToken) {
    return new Promise(function (resolve, reject) {
        request.get({
            url: RETRIEVE_PROJECTS_URL,
            headers: { SCZAccessToken: SCZAccessToken },
            json: true
        }, function (error, response, body) {
            if (error !== null) {
                return reject(error);
            }
            resolve(body);
        });
    });
}
exports.retrievePendingPosts = retrievePendingPosts;
//# sourceMappingURL=service.js.map