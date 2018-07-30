var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes');
var pathToClient = process.env.PATH_TO_CLIENT || path.join(__dirname, '../dist/steem-curator');
app.use(express.static(pathToClient));
var router = express.Router();
app.use(routes.registerRoutes(router, app));
app.route('/*')
    .get(function (req, res) {
    res.sendFile(pathToClient + "/index.html");
});
var port = process.env.port || 3000;
app.listen(port, function () {
    console.log("Running on post " + port);
});
//# sourceMappingURL=server.js.map