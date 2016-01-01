'use strict';

angular.module('stocked-app', [
    'stocked-app.components.login',
    'stocked-app.components.inventory',
    'stocked-app.components.search',
    'stocked-app.components.search-result',
    'stocked-app.components.beer',
    'ui.router'
])
    .constant('config', {
        firebaseUrl: 'https://stocked-app.firebaseio.com/'
    })
    .run(run);

run.$inject = ['$rootScope', '$state'];

function run($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('login');
        }
    });
}
