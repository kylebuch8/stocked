'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

var routes = require('./server/routes/api');
var appRoutes = require('./server/routes/app');

server.connection({
    host: 'localhost',
    port: 8000
});

server.register(require('vision'), (err) => {
    if (err) {
        console.log('Failed to load vision');
    }
});

server.register(require('inert'), (err) => {
    if (err) {
        console.log('Failed to load inert');
    }
});

server.views({
    engines: { html: require('handlebars') },
    relativeTo: __dirname,
    path: './client/'
});

routes.forEach((route) => {
    server.route(route);
});

appRoutes.forEach((route) => {
    server.route(route);
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at: ', server.info.uri);
});
