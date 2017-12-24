(function () {
    'use strict';
    require('./home.scss');

    HomeController.$inject = ['$scope', '$state','$q', 'MoviesService'];
    function HomeController($scope, $state, $q, MoviesService) {
        var vm = this;
        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.activeSlide1 = 0;
        vm.activeSlide2 = 0;
        vm.activeSlide3 = 0;
        vm.activeSlide4 = 0;
        vm.slidesToShow = 10

        vm.$onInit = function () {
            getCarousel();
        };

        var getCarousel = function () {
            var promises = [];
            promises.push(MoviesService.getCategoryMovie("top_rated"));
            promises.push(MoviesService.getCategoryMovie("now_playing"));
            promises.push(MoviesService.getCategoryMovie("popular"));
            promises.push(MoviesService.getCategoryMovie("upcoming"));

            $q.all(promises).then(function (results) {
                vm.topSlides = results[0];
                vm.recentSlides = results[1];
                vm.popularSlides = results[2];
                vm.upcomingSlides = results[3];
            });
        }

        vm.search = function (category, searchText) {
            console.log(category, searchText);
            //$state.go('app.filter', { filter: vm.searchText });
        };

        vm.goToDetail = function (category) {
            $state.go('app.filter', { filter: category });
        }
    }

    var homeComponent = angular.module('movies').component('mwHome', {
        template: require('./home.html'),
        bindings: {
            movies: '='
        },
        controllerAs: 'home',
        controller: HomeController
    });

    module.exports = homeComponent.name;
})();