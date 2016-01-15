'use strict';

angular.module('stocked-app.components.inventory', [
    'stocked-app.common.services.stocked',
    'stocked-app.common.directives.stocked-beer',
    'ui.router'
])
    .config(config)
    .controller('InventoryController', InventoryController);

config.inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
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

    $urlRouterProvider.otherwise('/inventory');
}

InventoryController.$inject = ['$scope', '$state', 'StockedService'];

function InventoryController($scope, $state, StockedService) {
    $scope.inventory = StockedService.getInventory();

    $scope.inventory.$loaded(function () {
        $scope.uniqueBeers = Object.keys($scope.inventory.stock).length;
    });

    $scope.search = function () {
        $state.go('search', {
            term: $scope.searchTerm
        });
    };
}
