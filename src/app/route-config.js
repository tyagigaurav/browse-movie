(function () {
    'use strict';

    var routeConfig = function ($stateProvider, $urlServiceProvider, $locationProvider) {
        $urlServiceProvider.rules.otherwise({
            state: 'app'
        });

        $stateProvider.state('app', {
            url: '/app',
            redirectTo: 'app.home'
        });

        $stateProvider.state('app.home', {
            url: '/home',
            component: 'homeComponent'
        });

        $stateProvider.state('app.filter', {
            url: '/movie-filter',
            component: 'filterMovieComponent',
        });

    };

    module.exports = routeConfig;
})();