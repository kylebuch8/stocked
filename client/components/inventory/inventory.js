'use strict';

angular.module('stocked-app.components.inventory', [
    'stocked-app.common.services.stocked',
    'stocked-app.common.directives.stocked-beer',
    'ui.router'
])
    .config(config)
    .controller('InventoryController', InventoryController);

config.inject = ['$stateProvider'];

function config($stateProvider) {
    $stateProvider
            .state('inventory', {
                url: '/inventory',
                templateUrl: 'components/inventory/inventory.html',
                controller: 'InventoryController',
                resolve: {
                    'currentAuth': ['StockedService', function (StockedService) {
                        return StockedService.auth().$requireAuth();
                    }]
                }
            });
}

InventoryController.$inject = ['$scope', 'StockedService'];

function InventoryController($scope, StockedService) {
    $scope.inventory = StockedService.getInventory();

    $scope.inventory.$loaded(function () {
        $scope.uniqueBeers = Object.keys($scope.inventory.stock).length;
    });
}
