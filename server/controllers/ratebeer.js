'use strict';

const ratebeerApi = require('ratebeer-api');
const q = require('q');
const ratebeerUrl = 'http://ratebeer.com';

var ratebeerModule = {
    beerSearch: (query) => {
        var deferred = q.defer();

        ratebeerApi.beerSearch(query, (beers) => {
            deferred.resolve(JSON.parse(beers));
        });

        return deferred.promise;
    },
    beerPage: (url) => {
        var deferred = q.defer();

        ratebeerApi.beerPage(url, (beer) => {
            if (beer.length) {
                var beerData = JSON.parse(beer)[0];
                beerData.url = ratebeerUrl + url;
                deferred.resolve(beerData);
            } else {
                deferred.reject();
            }
        });

        return deferred.promise;
    },
    getRating: (query) => {
        return ratebeerModule.beerSearch(query)
            .then((beers) => {
                return ratebeerModule.beerPage(beers[0].beer_url);
            });
    }
};

module.exports = ratebeerModule;
