var restify = require('restify');
var restifySwagger = require('node-restify-swagger');
var restifyValidation = require('node-restify-validation');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restifyValidation.validationPlugin({
    errorsAsArray: false,
}));
restifySwagger.configure(server, {
    description: 'Description of my API',
    title: 'Title of my API',
    allowMethodInModelNames: true
});

server.post({
    url: '/animals',
    swagger: {
            summary: 'Add animal',
            docPath: 'zoo'
    },
    validation: {
        name: { isRequired: true, isAlpha:true, scope: 'body' },
        locations: { isRequired: true, type:'array', swaggerType: 'Location', scope: 'body' }
    },
    models: {
        Location: {
            id: 'Location',
            properties: {
                name: { type: 'string' },
                continent: { type: 'string' }
            }
        },
    }
}, function (req, res, next) {
    res.send(req.params);
});

restifySwagger.loadRestifyRoutes();
server.listen(3081, function () {
    console.log('%s listening at %s', server.name, server.url);
});