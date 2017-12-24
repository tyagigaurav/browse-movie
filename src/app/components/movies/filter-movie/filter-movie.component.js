(function () {
    'use strict';
    require('./filter-movie.scss');

    FilterMovieController.$inject = ['$scope', '$http', '$state', 'MoviesService', 'AppState'];
    function FilterMovieController($scope, $http, $state, MoviesService, AppState) {
        var vm = this;

        vm.$onInit = function () {

            vm.filteredData = AppState.getFilteredData().data;
        };
    };

    var filterMovieComponent = angular.module('movies').component('mwFilterMovie', {
        template: require('./filter-movie.html'),
        bindings: {
        },
        controller: FilterMovieController
    });

    module.exports = filterMovieComponent.name;
})();