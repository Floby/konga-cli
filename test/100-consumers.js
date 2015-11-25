var utils = require('./utils');
var nock = utils.nock
var expect = utils.expect;

var consumers = require('../commands/consumers');

describe('consumers', function () {
  describe('.set(username)', function () {
    describe('when the consumer does not exist', function () {
      beforeEach(() => nock().get('/consumers/me').reply(404))

      it('creates the consumer', function (done) {
        var expected = {
          id: 'me-id',
          username: 'me'
        }
        var creation = nock().put('/consumers', {username: 'me'}).reply(201, expected);
        consumers.set('me', function (err, consumer) {
          if (err) return done(err);
          expect(consumer).to.deep.equal(expected);
          creation.done();
          done();
        });
      })
    })

    describe('when the consumer already exist', function () {
      beforeEach(() => nock().get('/consumers/me').reply(200, {id: 'me-id', username: 'me'}))

      it('does nothing', function (done) {
        var creation = nock().put('/consumers', {username: 'me'}).reply(409);
        consumers.set('me', function (err, consumer) {
          if (err) return done(err)
          expect(creation.done.bind(creation)).to.throw()
          expect(consumer).to.deep.equal({id: 'me-id', username: 'me'})
          done()
        })
      });
    });
  })

  describe('.plugin(username, plugin, config)', function () {
    describe('when there is no configuration', function () {
      beforeEach(() => nock().get('/consumers/me/oauth2').reply(200, {data:[]}))
      it('creates the configuration', function (done) {
        var creation = nock().put('/consumers/me/oauth2').reply(201, {name: 'my-app', some: 'default', id: 'plugin-id'})
        consumers.plugin('me', 'oauth2', {name: 'my-app'}, function (err, plugin) {
          if (err) return done(err);
          expect(plugin).to.deep.equal({name: 'my-app', some: 'default', id: 'plugin-id'})
          creation.done();
          done()
        })
      });
    })
    describe('when there already is a configuration', function () {
      beforeEach(() => nock().get('/consumers/me/oauth2').reply(200, {data:[{name: 'my-app', some: 'default', id: 'plugin-id'}]}))
      it('creates the configuration', function (done) {
        var update = nock().put('/consumers/me/oauth2', {
          id: 'plugin-id', name: 'my-app', some: 'data'
        }).reply(200, {name: 'my-app', some: 'data', id: 'plugin-id'})

        consumers.plugin('me', 'oauth2', {name: 'my-app', some: 'data'}, function (err, plugin) {
          if (err) return done(err);
          expect(plugin).to.deep.equal({name: 'my-app', some: 'data', id: 'plugin-id'})
          update.done();
          done()
        })
      });
    })

    describe('when no name is specified', function () {
      it('calls back with an error', function (done) {
        consumers.plugin('me', 'my-app', {}, function (err) {
          expect(err).to.be.an.instanceof(Error)
          expect(err).to.match(/konga requires a config.name/i)
          done()
        })
      })
    })
  })

  afterEach(function () {
    require('nock').cleanAll();
  })
})
