'use strict';

angular.module('stocked-app.common.services.stocked', [
    'firebase'
])
    .factory('StockedService', StockedService);

StockedService.$inject = [
    '$q',
    '$http',
    '$firebaseAuth',
    '$firebaseObject',
    '$firebaseArray',
    'config'
];

function StockedService($q, $http, $firebaseAuth, $firebaseObject, $firebaseArray, config) {
    var ref = new Firebase(config.firebaseUrl);
    var service = {
        login: login,
        auth: auth,
        search: search,
        getBeerById: getBeerById,
        addBeerToInventory: addBeerToInventory,
        getInventory: getInventory,
        getInventoryBeerById: getInventoryBeerById
    };

    function login() {
        return auth().$authWithOAuthPopup('google').then(function (authData) {
            var deferred = $q.defer();

            ref.child('users').child(authData.uid).update(authData, function () {
                deferred.resolve();
            });

            return deferred.promise;
        });
    }

    function auth() {
        return $firebaseAuth(ref);
    }

    function search(value) {
        var deferred = $q.defer();

        if (!value) {
            deferred.reject();
            return deferred.promise;
        }

        return $http.get('/api/search', {
            params: {
                q: value,
                type: 'beer',
                withBreweries: 'Y'
            }
        });
    }

    function getBeerById(id) {
        var deferred = $q.defer();

        if (!id) {
            deferred.reject();
            return deferred.promise;
        }

        return $http.get('/api/beer/' + id, {
            params: {
                withBreweries: 'Y'
            }
        });
    }

    function addBeerToInventory(beer) {
        var inventory = getInventory();

        return inventory.$add(beer);
    }

    function getInventory() {
        var authData = auth().$getAuth();
        var inventoryRef = ref.child('inventories/' + authData.uid);

        return $firebaseArray(inventoryRef);
    }

    function getInventoryBeerById(id) {
        var authData = auth().$getAuth();
        var beerRef = ref.child('inventories/' + authData.uid + '/' + id);

        return $firebaseObject(beerRef);
    }

    return service;
}
