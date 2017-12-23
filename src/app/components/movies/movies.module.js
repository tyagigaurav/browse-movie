(function () {

    'use strict';

    var angular = require('angular');
    
    var MoviesModule = angular.module('movies', [
    ]);
    
    require('./filter-movie/filter-movie.component');
    require('./home/home.component');

    module.exports = MoviesModule.name;

})();