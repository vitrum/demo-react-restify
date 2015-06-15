var assert = require('assert');
var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://localhost:3080',
  version: '~1.0'
});

client.get('/echo/mark', function (err, req, res, obj) {
  assert.ifError(err);
  console.log('Server returned: %j', obj);
});