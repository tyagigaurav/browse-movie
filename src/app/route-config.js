(function () {
    'use strict';

    var routeConfig = ['$stateProvider', '$urlServiceProvider', '$locationProvider', function ($stateProvider, $urlServiceProvider, $locationProvider) {
        $urlServiceProvider.rules.otherwise({
            state: 'app'
        });

        $stateProvider.state('app', {
            url: '/app',
            redirectTo: 'app.home'
        });

    }];

    module.exports = routeConfig;
})();