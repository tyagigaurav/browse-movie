(function () {
    'use strict';
    require('./filter-movie.scss');

    function FilterMovieController($scope, $http, $state, MoviesService, AppState) {
        var vm = this;

        vm.$onInit = function () {

            vm.slidesToShow = 10;
            vm.filteredData = normalize(AppState.getFilteredData().type, AppState.getFilteredData().data);
            
        };

         var normalize = function(type, data){
             var arr = [];
             angular.forEach(data, function(item){
                var obj = {}; 
                if(type === "movie"){
                    obj.name = item.title;
                    obj.overview = item.overview;
                    obj.ratings = item.vote_average;
                    obj.id = item.id;
                    if(item.poster_path){
                        obj.image = 'http://image.tmdb.org/t/p/w185/' + item.poster_path;
                    }else{
                        obj.image = 'resources/images/no-preview.jpg';
                    }
                    obj.release_date = item.release_date;
                    if(AppState.getWatchlist() && AppState.getWatchlist()[type] && AppState.getWatchlist()[type].includes(obj.id)){
                        obj.inWatchlist = true;
                    }else{
                        obj.inWatchlist = false;
                    }
                 }
                 else if(type === "tv"){
                    obj.name = item.name;
                    obj.overview = item.overview;
                    obj.ratings = item.vote_average;
                    obj.id = item.id;
                    if(item.poster_path){
                        obj.image = 'http://image.tmdb.org/t/p/w185/' + item.poster_path;
                    }else{
                        obj.image = 'resources/images/no_preview.jpg';
                    }
                    obj.release_date = item.first_air_date;
                    if(AppState.getWatchlist() && AppState.getWatchlist()[type] && AppState.getWatchlist()[type].includes(obj.id)){
                        obj.inWatchlist = true;
                    }else{
                        obj.inWatchlist = false;
                    }
                 }
                 obj.type = type;
                 arr.push(obj);    
             });
             return arr;
        };

        vm.addMoreSlides = function(){
            vm.slidesToShow += 10;
        };

        vm.toggleWishlist = function(item){
            if(item.inWatchlist){
                AppState.removeFromWatchlist(item.type, item.id)
            }else{
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