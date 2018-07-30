"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller = require("./controller");
function RegisterProjectRoutes(router) {
    router.get('/api/utopian/pending', controller.retrievePending);
}
exports.RegisterProjectRoutes = RegisterProjectRoutes;
//# sourceMappingURL=index.js.map