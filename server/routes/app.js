'use strict';

var app = require('../controllers/app');

module.exports = [
    {
        method: 'GET',
        path: '/{path*}',
        config: app.assets
    },
    {
        method: 'GET',
        path: '/',
        config: app.index
    }
];
