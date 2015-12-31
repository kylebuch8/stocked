'use strict';

var brewerydb = require('../controllers/brewerydb');

module.exports = [
    {
        method: 'GET',
        path: '/api/beer/{beerId}',
        config: brewerydb.beer
    },
    {
        method: 'GET',
        path: '/api/search',
        config: brewerydb.search
    }
];
