'use strict';

angular.module('stocked-app.common.directives.stocked-beer', [])
    .directive('stockedBeer', stockedBeer);

function stockedBeer() {
    var directive = {
        restrict: 'AE',
        templateUrl: 'common/directives/stocked-beer/stocked-beer.html'
    };

    return directive;
}
