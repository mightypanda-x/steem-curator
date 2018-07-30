"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fromUtopianService = require("./service");
var _ = require("lodash");
function retrievePending(req, res, next) {
    fromUtopianService.retrievePendingPosts(_.get(req, 'user.accessToken', ''))
        .then(function (posts) {
        res.status(200).send(posts);
    })
        .catch(function (error) { return next(error); });
}
exports.retrievePending = retrievePending;
//# sourceMappingURL=controller.js.map