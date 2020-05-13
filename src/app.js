const express = require('express');
const bodyParser = require('body-parser');
const VError = require('verror');
const path = require('path');
const appConfig = require('./config/appConfig.js');
const StethoscopeRecord = require('./models/stethoscopeRecord.js');
const globby = require('globby');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup: mongoose
require('./services/mongoDB.js').connect(appConfig.mongo.url);

// Database setup: direct mongo client
require('./services/mongoDB.js').init(appConfig.mongo.url);

// Include all routes in directory
globby
  .sync(['routes/**/*.js', '**/*.routes.js'], { cwd: __dirname })
  // eslint-disable-next-line global-require
  .forEach(f => require(path.resolve(__dirname, f))(app));

app.listen(port, () => console.log(`Listening on port ${port}`));