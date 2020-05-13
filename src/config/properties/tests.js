module.exports = function(config) {
  config.app.logLevel = 'debug';

  config.mongo.allowPurgeData = true;
  config.mongo.dbName = 'test';
  config.mongo.url = 'mongodb://localhost/local';
};
