var restify = require('restify');

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.jsonp());
server.use(restify.bodyParser());


server.use(
    function crossOrigin(req,res,next){
        'use strict';
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

server.post('/login/user', function (req, res, next) {
	console.log('login');
	console.log(req.headers);
  res.send(req.headers);
  return next();
});

server.get('/echo/:name', function (req, res, next) {
	console.log('echo');
  res.send(req.params);
  return next();
});


server.get('/json/v1',function(req,res,next){
  var a = {name:'conan',blog:'blog.fens.me'}
  res.send(a);
});


server.listen(3080, function () {
  console.log('%s listening at %s', server.name, server.url);
  
});