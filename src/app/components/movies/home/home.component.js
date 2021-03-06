(function () {
    'use strict';
    require('./home.scss');

    function HomeController($scope, $state, $q, MoviesService, AppState) {
        var vm = this;
        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.activeSlide1 = 0;
        vm.activeSlide2 = 0;
        vm.activeSlide3 = 0;
        vm.activeSlide4 = 0;
        vm.slidesToShow = 10;

        vm.$onInit = function () {
            vm.dataLoaded = false;
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
                vm.dataLoaded = true;
            });
        }

        vm.search = function (category, query) {
            MoviesService.getFilterredMovie(category, query).then(function(data){
                AppState.setFilteredData(category, "filter", data);
                $state.go('app.filter');
            }, function(){

            });
        };

        vm.viewMoreDetails = function (category,data) {
            $state.go('app.filter');
            AppState.setFilteredData("movie", category, data);
        }
    }

    var homeComponent = angular.module('movies').component('mwHome', {
        template: require('./home.html'),
        controllerAs: 'home',
        controller: ['$scope', '$state','$q', 'MoviesService','AppState', HomeController]
    });

    module.exports = homeComponent.name;
})();