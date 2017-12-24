(function () {
    'use strict';
    require('./home.scss');

    HomeController.$inject = ['$scope', '$state', 'MoviesService'];
    function HomeController($scope, $state, MoviesService) {
        var vm = this;
        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.active = 0;

        vm.$onInit = function () {
            MoviesService.getTopRatedMovie().then(function (data) {
                vm.topSlides = data.data.results.splice(0, 10);
            }, function (error) {
                vm.errMsg = error;
            });
            MoviesService.getNowplayingMovie().then(function (data) {
                vm.recentSlides = data.data.results.splice(0, 10);
            }, function (error) {
                vm.errMsg = error;
            });
            MoviesService.getPopularMovie().then(function (data) {
                vm.popularSlides = data.data.results.splice(0, 10);
            }, function (error) {
                vm.errMsg = error;
            });
            MoviesService.getUpcomingMovie().then(function (data) {
                vm.upcomingSlides = data.data.results.splice(0, 10);
            }, function (error) {
                vm.errMsg = error;
            });
        };

        vm.search = function (category,searchText) {
            console.log(category,searchText);
            //$state.go('app.filter', { filter: vm.searchText });
        };

        vm.goToDetail = function (category) {
            $state.go('app.filter', { filter: category });
        }
    }

    var homeComponent = angular.module('movies').component('mwHome', {
        template: require('./home.html'),
        bindings: {
        },
        controllerAs: 'home',
        controller: HomeController
    });

    module.exports = homeComponent.name;
})();