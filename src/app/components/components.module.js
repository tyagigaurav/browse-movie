(function () {

    'use strict';

    var angular = require('angular');
    var movies = require('./movies/movies.module');
    
    var ComponentsModule = angular.module('app.components', [
        movies
    ]);

    module.exports = ComponentsModule.name;

})();