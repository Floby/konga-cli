var utils = require('./utils');
var nock = utils.nock
var expect = utils.expect;

var plugins = require('../commands/plugins');

describe('plugins', function () {
  describe('.list(name)', function () {
    it('lists the configured plugins on the api', function (done) {
      var expected = [
        {name: 'some-plugin', id: 'plugin-id', enabled: true, config: {}},
        {name: 'oauth2', id: 'oauthid', enabled: false, config: {}}
      ]
      nock().get('/apis/my-api/plugins').reply(200, {data: expected})
      plugins.list('my-api', function (err, plugins) {
        if(err) return done(err);
        expect(plugins).to.deep.equal(plugins)
        done();
      })
    })
  })

  describe('.set(api, plugin, config)', function () {
    describe('when the plugin is not configured', function () {
      beforeEach(() => nock().get('/apis/my-api/plugins').reply(200, {data: []}))
      it('creates a plugin configuration', function (done) {
        var created = {
          id: 'hey',
          something: 'something'
        }
        var creation = nock()
          .put('/apis/my-api/plugins', {name: 'oauth2', config: {enable_password_grant: true}})
          .reply(201, created)
        plugins.set('my-api', 'oauth2', {enable_password_grant: true}, function (err, plugin) {
          if (err) return done(err);
          expect(plugin).to.deep.equal(created);
          creation.done();
          done()
        });
      });
    })

    describe('when the plugin is already configured', function () {
      beforeEach(() => nock().get('/apis/my-api/plugins').reply(200, {data: [{name: 'oauth2', id:'some-id'}]}))
      it('updates the plugin configuration', function (done) {
        var update = nock()
          .put('/apis/my-api/plugins', {name: 'oauth2', config: {enable_password_grant: true}, id: 'some-id'})
          .reply(200, {})
        plugins.set('my-api', 'oauth2', {enable_password_grant: true}, function (err) {
          if (err) return done(err);
          update.done();
          done();
        })
      });
    });
  })
  afterEach(function () {
    require('nock').cleanAll();
  })
})
