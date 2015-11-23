var utils = require('./utils');
var expect = utils.expect;

var configurator = require('../lib/configurator');
var parseField = configurator.parseField;

describe('configurator(["field=value"])', function () {
  describe('with an empty array', function () {
    it('returns an empty object', function () {
      expect(configurator([])).to.deep.equal({});
    })
  })

  describe('with an array of values', function () {
    it('returns object with all parseFields resulsts', function () {
      var input = ['name=hello', 'flag', 'limit=7200', 'scopes=hey,oh', 'noflag=false']
      expect(configurator(input)).to.deep.equal({
        flag: true,
        noflag: false,
        limit: 7200,
        name: 'hello',
        scopes: ['hey','oh']
      })
    })
  })

})

describe('parseField("name=value")', function () {
  it('returns an object', function () {
    expect(parseField('')).to.deep.equal({})
  })
  describe('with a single string', function () {
    it('returns this fields as true', function () {
      expect(parseField('my_flag')).to.deep.equal({my_flag: true})
    })
  });

  describe('with a field as boolean false', function () {
    it('returns this field as false', function () {
      expect(parseField('my_flag=false')).to.deep.equal({my_flag: false})
    });
  })

  describe('with a field as string', function () {
    it('returns this field as string', function () {
      expect(parseField('field=value')).to.deep.equal({field: 'value'})
    });
  })

  describe('with a field as a number', function () {
    it('returns this field as number', function () {
      expect(parseField('limit=100')).to.deep.equal({limit: 100})
    })
  })

  describe('with a field as zero', function () {
    it('returns this field as zero', function () {
      expect(parseField('limit=0')).to.deep.equal({limit: 0})
    })
  })

  describe('with a list of strings', function () {
    it('returns this field as an array of string', function () {
      expect(parseField('scopes=hello,goodbye,bye')).to.deep.equal({scopes: ['hello', 'goodbye', 'bye']})
    })
  })
})
