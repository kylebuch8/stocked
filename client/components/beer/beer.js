'use strict';

angular.module('stocked-app.components.beer', [
    'stocked-app.common.services.stocked',
    'ui.router'
])
    .config(config)
    .controller('BeerController', BeerController);

config.$inject = ['$stateProvider'];

function config($stateProvider) {
    $stateProvider
            .state('beer', {
                url: '/beer/:beerId',
                templateUrl: 'components/beer/beer.html',
                controller: 'BeerController',
                resolve: {
                    'currentAuth': ['StockedService', function (StockedService) {
                        return StockedService.auth().$requireAuth();
                    }]
                }
            });
}

BeerController.$inject = ['$scope', '$stateParams', 'StockedService'];

function BeerController($scope, $stateParams, StockedService) {
    $scope.beer = StockedService.getInventoryBeerById($stateParams.beerId);

    // $scope.add = function () {
    //     StockedService.addBeerToInventory($scope.beer).then(function (data) {
    //         console.log(data);
    //     });
    // };
}
