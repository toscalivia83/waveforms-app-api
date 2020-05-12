module.exports = function(config) {
  config.app.logLevel = 'debug';

  config.mongo.allowPurgeData = true;
  config.mongo.dbName = 'dev';
  config.mongo.url = 'mongodb://localhost/dev';
};
