(function () {
    'use strict';
    require('./filter-movie.scss');

    function FilterMovieController($scope, $http, $state, MoviesService, AppState) {
        var vm = this, watchlistData, filteredData;

        vm.$onInit = function () {

            vm.slidesToShow = 10;
            watchlistData = AppState.getWatchlist();
            filteredData = AppState.getFilteredData();
            vm.normalisedData = normalize(filteredData.type, filteredData.data);

        };

        var normalize = function (type, data) {
            var arr = [];
            angular.forEach(data, function (item) {
                var obj = {};
                obj.name = item.title;
                obj.overview = item.overview;
                obj.ratings = item.vote_average;
                obj.id = item.id;
                obj.image = item.poster_path ? 'http://image.tmdb.org/t/p/w185/' + item.poster_path : 'resources/images/no_preview.jpg';
                obj.release_date = type === "movie" ? item.release_date : item.first_air_date;
                obj.inWatchlist = isInWatchlist(watchlistData, type, item.id);
                obj.type = type;
                arr.push(obj);
            });
            return arr;
        };

        var isInWatchlist = function (watchlistData, type, id) {
            return watchlistData && watchlistData[type] && watchlistData[type].includes(id);
        }

        vm.addMoreSlides = function () {
            vm.slidesToShow += 10;
        };

        vm.toggleWishlist = function (item) {
            if (item.inWatchlist) {
                AppState.removeFromWatchlist(item.type, item.id)
            } else {
                AppState.addInWatchlist(item.type, item.id)
            }
            item.inWatchlist = !item.inWatchlist;
        }
    };

    var filterMovieComponent = angular.module('movies').component('mwFilterMovie', {
        template: require('./filter-movie.html'),
        bindings: {
        },
        controller: ['$scope', '$http', '$state', 'MoviesService', 'AppState', FilterMovieController]
    });

    module.exports = filterMovieComponent.name;
})();