const VError = require('verror');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const appConfig = require('../config/appConfig.js');
const LOG = require("../utils/logger");

let client;
let db;

// Connect to DB
module.exports.connect = function(mongoUrl) {
  mongoose.Promise = Promise;
  mongoose.connection
    .on('error', function(err) {
      LOG.logError(new VError(`Mongoose failed to connect to DB ${mongoUrl}`, err));
    })
    .on('open', function() {
      LOG.logRequest(`Mongoose connected to DB ${mongoUrl}`);
    })
    .on('reconnected', function() {
      LOG.logRequest(`Mongoose re-connected to DB ${mongoUrl}`);
    });
  mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
};

// Run once on application start, create a re-usable connection to mongo
module.exports.init = function(mongoUrl) {
  return MongoClient.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function(newClientInstance) {
      client = newClientInstance;
      db = client.db(appConfig.mongo.dbName);
      return client;
    })
    .catch(function(error) {
      LOG.logError(new VError('Failed to connect to DB'));
      return new VError(error, 'Failed to connect to DB');
    });
};
