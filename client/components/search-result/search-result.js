'use strict';

angular.module('stocked-app.components.search-result', [
    'stocked-app.common.services.stocked',
    'stocked-app.common.directives.stocked-beer',
    'ui.router'
])
    .config(config)
    .controller('SearchResultController', SearchResultController);

config.$inject = ['$stateProvider'];

function config($stateProvider) {
    $stateProvider
            .state('searchResult', {
                url: '/search/result/:beerId',
                templateUrl: 'components/search-result/search-result.html',
                controller: 'SearchResultController',
                resolve: {
                    'currentAuth': ['StockedService', function (StockedService) {
                        return StockedService.auth().$requireAuth();
                    }]
                }
            });
}

SearchResultController.$inject = ['$scope', '$stateParams', 'StockedService'];

function SearchResultController($scope, $stateParams, StockedService) {
    StockedService.getBeerById($stateParams.beerId).then(function (response) {
        $scope.beer = response.data.data;
    });

    $scope.add = function () {
        StockedService.addBeerToInventory($scope.beer).then(function (data) {
            console.log(data);
        });
    };
}
