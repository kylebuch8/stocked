'use strict';

angular.module('stocked-app.components.login', [
    'ui.router',
    'stocked-app.common.services.stocked'
])
    .config(config)
    .controller('LoginController', LoginController);

config.inject = ['$stateProvider'];

function config($stateProvider) {
    $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.html',
                controller: 'LoginController'
            });
}

LoginController.$inject = ['$scope', '$state', 'StockedService'];

function LoginController($scope, $state, StockedService) {
    $scope.login = function () {
        StockedService.login().then(onAuthSuccess, onAuthError);
    };

    function onAuthSuccess() {
        $state.go('inventory');
    }

    function onAuthError(error) {
        console.log(error);
    }
}
