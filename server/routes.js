"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utopian = require("./api/utopian");
function registerRoutes(router, app) {
    Utopian.RegisterProjectRoutes(router);
    return router;
}
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=routes.js.map