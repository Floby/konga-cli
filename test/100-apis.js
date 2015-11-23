var utils = require('./utils');
var nock = utils.nock
var expect = utils.expect;

var apis = require('../commands/apis');

describe('apis', function () {
  describe('.list()', function () {
    it('lists all known apis', function (done) {
      var expected = [
        {id: 'whatever', name: 'my-first', upstream_url: 'http://first', request_host: 'first-api'},
        {id: 'whichever', name: 'my-second', upstream_url: 'http://second', request_path: '/second-api'}
      ]
      nock().get('/apis').reply(200, {
        data: expected
      })
      apis.list(function (err, apis) {
        if (err) return done(err);
        expect(apis).to.deep.equal(expected);
        done();
      });
    });
  });

  describe('.set(name, upstream, options)', function () {
    describe('when it does not exist yet', function () {
      beforeEach(function () {
        nock().get('/apis/my-api').reply(404)
      })

      it('creates it', function (done) {
        var newApi = {
          id: 'id',
          name: 'my-api',
          upstream_url: 'http://some-upstream',
          request_host: 'my.host'
        }
        var creation = nock().put('/apis', { 
          name: 'my-api', upstream_url: 'http://some-upstream', request_host: 'my.host'
        }).reply(201, {data: newApi});

        apis.set('my-api', 'http://some-upstream', {request_host: 'my.host'}, function (err, api) {
          if (err) return done(err);
          expect(api).to.deep.equal(newApi);
          creation.done();
          done();
        });
      })
    })

    describe('when it already exists', function () {
      beforeEach(function () {
        nock().get('/apis/my-api').reply(200, {id: 'my-api-id'})
      })

      it('updates the existing api', function (done) {
        var creation = nock().put('/apis', { 
          id: 'my-api-id', name: 'my-api', upstream_url: 'http://some-upstream', request_host: 'my.host'
        }).reply(200, {data: {}});

        apis.set('my-api', 'http://some-upstream', {request_host: 'my.host'}, function (err, api) {
          if (err) return done(err);
          creation.done();
          done();
        });
      });
    });
  });

  afterEach(function () {
    require('nock').cleanAll();
  })
})

