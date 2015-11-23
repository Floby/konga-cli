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
    describe('when there already is a configuration', function () {
      it('creates the configuration', function () {
      });
    })
  })

  afterEach(function () {
    require('nock').cleanAll();
  })
})
