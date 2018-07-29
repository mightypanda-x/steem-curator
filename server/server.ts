// set up ========================

const express  = require('express');

const path   = require('path');
const app    = express(); // create our app w/ express
const routes = require('./routes');

const pathToClient = process.env.PATH_TO_CLIENT || path.join(__dirname, '../dist/steem-curator');
app.use(express.static(pathToClient));

const router = express.Router();
app.use(routes.registerRoutes(router, app));
app.route('/*')
  .get((req, res) => {
    res.sendFile(`${pathToClient}/index.html`);
  });

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Running on post ${port}`);
});
