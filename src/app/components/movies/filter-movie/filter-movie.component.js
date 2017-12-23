(function () {
    'use strict';
    require('./filter-movie.scss');

    FilterMovieController.$inject = ['$scope', '$http', '$state', 'detailComponentService', '$stateParams'];
    function FilterMovieController($scope, $http, $state, detailComponentService, $stateParams) {
        var vm = this;
        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.active = 0;

        vm.$onInit = function () {
            detailComponentService.getFilterredMovie($stateParams.filter).then(function (data) {
                vm.filteredData = data.data.results;
                console.log(vm.filteredData);
            }, function (error) {
                vm.errMsg = error;
            });
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