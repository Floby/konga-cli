var utils = require('./utils');
var expect = utils.expect
var sinon = require('sinon');

var display = require('../lib/display');

describe('display.config(config, fields)', function () {
  describe('given a config object', function () {
    it('displays a line for each field', function () {
      var config = {
        and_a : 8,
        some: 'property',
        hidden: 'field'
      }
      expect(display.config(config, ['some', 'and_a']).split('\n')).to.deep.equal([
        'some:                          property',
        'and_a:                         8'
      ])
    })

    describe('with fields not present in the config', function () {
      it ('ignores them', function () {
        expect(display.config({a: 8}, ['a', 'b'])).to.deep.equal('a:                             8')
      })
    })
  })

  describe('given a flag not to display names', function () {
    it('only prints the values', function () {
      var config = {
        and_a : 8,
        some: 'property',
        hidden: 'field'
      }
      expect(display.config(config, ['some', 'and_a'], true).split('\n')).to.deep.equal([
        'property',
        '8'
      ])
    });
  })
});

