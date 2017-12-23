(function () {
    'use strict';
    require('./home.scss');

    HomeController.$inject = ['$scope', '$state', 'Carousel'];
    function HomeController($scope, $state, Carousel) {
        var vm = this;
        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.active = 0;

        vm.$onInit = function () {
            homeComponentService.getTopRatedMovie().then(function (data) {
                vm.topSlides = data.data.results.splice(0, 10);
            }, function (error) {
                vm.errMsg = error;
            });
            homeComponentService.getNowplayingMovie().then(function (data) {
                vm.recentSlides = data.data.results.splice(0, 10);
            }, function (error) {
                vm.errMsg = error;
            });
            homeComponentService.getPopularMovie().then(function (data) {
                vm.popularSlides = data.data.results.splice(0, 10);
            }, function (error) {
                vm.errMsg = error;
            });
            homeComponentService.getUpcomingMovie().then(function (data) {
                vm.upcomingSlides = data.data.results.splice(0, 10);
            }, function (error) {
                vm.errMsg = error;
            });
        };

        vm.search = function (searchText) {
            $state.go('app.journey.detail', { filter: vm.searchText });
        };

        vm.goToDetail = function (category) {
            $state.go('app.journey.detail', { filter: category });
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