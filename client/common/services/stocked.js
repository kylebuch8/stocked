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
        getInventoryBeerById: getInventoryBeerById,
        updateInventoryCount: updateInventoryCount
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
        var stock = getInventoryStock();
        beer.quantity = 1;

        updateInventoryCount(true);

        return stock.$add(beer);
    }

    function getInventory() {
        var authData = auth().$getAuth();
        var inventoryRef = ref.child('inventories/' + authData.uid);

        return $firebaseObject(inventoryRef);
    }

    function getInventoryBeerById(id) {
        var authData = auth().$getAuth();
        var beerRef = ref.child('inventories/' + authData.uid + '/stock/' + id);

        return $firebaseObject(beerRef);
    }

    function getInventoryStock() {
        var authData = auth().$getAuth();
        var beerRef = ref.child('inventories/' + authData.uid + '/stock');

        return $firebaseArray(beerRef);
    }

    function updateInventoryCount(increment) {
        var authData = auth().$getAuth();
        var inventoryCountRef = ref.child('inventories/' + authData.uid + '/count');

        inventoryCountRef.transaction(function (currentValue) {
            if (!currentValue) {
                return 0;
            }

            return (increment) ? currentValue + 1 : currentValue - 1;
        });
    }

    return service;
}
