const VError = require('verror');
const StethoscopeRecord = require('../models/stethoscopeRecord.js');

module.exports = function(app) {
  app.get('/audio-annotations', (req, res, next) => {
    return StethoscopeRecord.find()
    .then(results => res.json({audioAnnotations: results}))
    .catch(err => next(new VError("Can't get audio annotations", err)));
  })

  app.post('/audio-annotations', (req, res, next) => {
    StethoscopeRecord.create(req.body)
    .then(() => res.send('sent'))
    .catch(err => next(new VError(`can't send results for url ${req.body.url}`, err)))
  });
};