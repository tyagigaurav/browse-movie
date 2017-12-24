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
                    if(AppState.getWishlist() && AppState.getWishlist()[type] && AppState.getWishlist()[type].includes(obj.id)){
                        obj.inWishlist = true;
                    }else{
                        obj.inWishlist = false;
                    }
                 }
                 else if(type === "person"){
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
                    if(AppState.getWishlist() && AppState.getWishlist()[type] && AppState.getWishlist()[type].includes(obj.id)){
                        obj.inWishlist = true;
                    }else{
                        obj.inWishlist = false;
                    }
                 }
                 else if(type === "tv"){
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
                    if(AppState.getWishlist() && AppState.getWishlist()[type] && AppState.getWishlist()[type].includes(obj.id)){
                        obj.inWishlist = true;
                    }else{
                        obj.inWishlist = false;
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
            if(item.inWishlist){
                AppState.removeFromWishlist(item.type, item.id)
            }else{
                AppState.addInWishlist(item.type, item.id)
            }
            item.inWishlist = !item.inWishlist;
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