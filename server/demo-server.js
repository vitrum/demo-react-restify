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



server.use(
    function crossOrigin(req,res,next){
        'use strict';
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);




function loginHandler(req,res,next) {
    // Get the first_name value from the POSTed data
    var json = {name:req.body.name, password:req.body.password };
    

 
    // Send back the value they posted
    res.send(json);
    // res.send(name + ',' + password);

    //test
    // curl -X POST -H "Content-Type: application/json" -d '{"name":"Joe"}' http://localhost:3080/login/user
}




server.post('/login/user', loginHandler)

server.get('/echo/:name', function (req, res, next) {
	console.log('echo');
  res.send(req.params);
  return next();
});


server.post('/json/v1',function(req,res,next){
  var a = {name:'conan',blog:'blog.fens.me'}
  res.send(a);
});


server.listen(3080, function () {
  console.log('%s listening at %s', server.name, server.url);
  
});