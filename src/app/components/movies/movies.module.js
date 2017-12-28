(function () {

    'use strict';

    var angular = require('angular');
    require('@uirouter/angularjs');
    require('angular-ui-bootstrap');
    
    var MoviesModule = angular.module('movies', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', '$urlServiceProvider', '$locationProvider', function ($stateProvider, $urlServiceProvider, $locationProvider) {

        $stateProvider.state('app.home', {
            url: '/home',
            component: 'mwHome'
        });

        $stateProvider.state('app.filter', {
            url: '/movie-filter',
            component: 'mwFilterMovie'
        });

    }]);
    
    /* ------- Components ---------- */
    require('./filter-movie/filter-movie.component');
    require('./home/home.component');

    /* ------- Services ---------- */
    require('./movies.service');


    module.exports = MoviesModule.name;

})();