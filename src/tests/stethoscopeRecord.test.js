const { expect } = require('chai')
const appConfig = require('../config/appConfig.js');
const mongoDB = require('../services/mongoDB.js');
const request = require('supertest');
const app = require('../app');
const testData = require('./dummy/stethoscopeRecords.json')
const StethoscopeRecord = require('../models/stethoscopeRecord.js');

describe('Endpoints work correctly', () => {
  before(async () => {
    await mongoDB.connect(appConfig.mongo.url)
    await mongoDB.dropDatabase("stethoscoperecord");
    await StethoscopeRecord.create(testData);
  });

  it('should get audio annotations from route', (done) => {
    request(app)
    .get('/audio-annotations')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      expect(res.body.audioAnnotations.length).to.equal(4);
      done();
    });
  })

  it('should post audio annotations from route', (done) => {
    request(app)
    .post('/audio-annotations')
    .send({
      audioUrl: "/test-url",
      numberOfBreaths: 25,
      hasHeartBeats: true
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res){
      if (err) return done(err);
      expect(res.text).to.equal("sent");
      done();
    });
  })

  after(async () => {
    await mongoDB.dropDatabase();
    await mongoDB.close();
  })
})