// Make sure we have all required environment variables (API keys etc)
let appConfigFilename;
console.log("process.env.NODE_ENV", process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') { // DEV has hard-coded API keys for convenience
  appConfigFilename = './properties/development.js';
} else {
  appConfigFilename = `./properties/${(process.env.APP_CONFIG || '').trim()}.js`;
}

// Configuration common to all environments
const config = {

  app: {
    logLevel: 'info',
  },

  // TODO: could add express cookie here

  mongo: {
    allowPurgeData: false, // Allow routes that purge DB (eg for DEV or TEST)
    dbName: 'dev',
    url: 'mongodb://localhost/dev',
  },

};

// Loads the correct app-configuration file, based on environment variable
try {
  require(appConfigFilename)(config); // eslint-disable-line global-require, import/no-dynamic-require
  module.exports = config;
} catch (e) {
  console.error('Error at initialisation of app. Missing or invalid APP_CONFIG environment variable: ', process.env.APP_CONFIG);
  process.exit(e.code);
}
