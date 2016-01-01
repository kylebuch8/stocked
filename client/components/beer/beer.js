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
    var beer = StockedService.getInventoryBeerById($stateParams.beerId);
    beer.$bindTo($scope, 'beer');
    beer.$loaded(function () {
        if (!$scope.beer.quantity) {
            $scope.beer.quantity = 0;
        }
    });


    $scope.add = function () {
        $scope.beer.quantity += 1;
    };

    $scope.subtract = function () {
        if ($scope.beer.quantity === 0) {
            return;
        }
        
        $scope.beer.quantity -= 1;
    };
}
