'use strict';

var config = require('../../config');
const request = require('request');
const ratebeer = require('../controllers/ratebeer.js');
const baseUrl = 'http://api.brewerydb.com/v2/';
const defaultParams = {
    key: process.env.brewerydb || config.brewerydb.apiKey
};

module.exports = {
    beer: {
        handler: (req, reply) => {
            var queryParams = Object.assign(defaultParams, req.query);

            request({
                uri: baseUrl + 'beer/' + req.params.beerId,
                qs: queryParams
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    if (queryParams.withRating === 'Y') {
                        var data = JSON.parse(body).data;
                        var beerName = data.breweries[0].nameShortDisplay + ' ' + data.name;

                        ratebeer.getRating(beerName).then((beer) => {
                            data.ratebeerData = beer;
                            return reply(data);
                        });
                    } else {
                        return reply(body);
                    }
                } else {
                    return reply(error);
                }
            });
        }
    },
    search: {
        handler: (req, reply) => {
            var queryParams = Object.assign(defaultParams, req.query);

            request({
                uri: baseUrl + 'search',
                qs: queryParams
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    return reply(JSON.parse(body));
                } else {
                    return reply(error);
                }
            });
        }
    }
};
