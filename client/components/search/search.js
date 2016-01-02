'use strict';

angular.module('stocked-app.components.search', [
    'stocked-app.common.services.stocked',
    'ui.router'
])
    .config(config)
    .controller('SearchController', SearchController);

config.$inject = ['$stateProvider'];

function config($stateProvider) {
    $stateProvider
            .state('search', {
                url: '/search/?term',
                reloadOnSearch: false,
                templateUrl: 'components/search/search.html',
                controller: 'SearchController',
                resolve: {
                    'currentAuth': ['StockedService', function (StockedService) {
                        return StockedService.auth().$requireAuth();
                    }]
                }
            });
}

SearchController.$inject = ['$scope', '$stateParams', 'StockedService'];

function SearchController($scope, $stateParams, StockedService) {
    $scope.searchTerm = $stateParams.term;

    $scope.search = function () {
        if ($scope.searchTerm.length > 1) {
            StockedService.search($scope.searchTerm).then(function (response) {
                if (response.status === 200) {
                    $scope.results = response.data.data;
                }
            });
        }
    };

    if ($scope.searchTerm) {
        $scope.search();
    }
}
