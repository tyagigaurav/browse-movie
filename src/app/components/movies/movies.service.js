(function () {

    'use strict';

    var moviesService = angular.module('movies').service('MoviesService', ['$q', '$http', '$rootScope', '$sce', function ($q, $http, $rootScope, $sce) {

        var self = this;

        self.getFilterredMovie = function (category, query) {

            var url = 'https://api.themoviedb.org/3/search/' + category;
            var trustedUrl = $sce.trustAsResourceUrl(url);
            var params = {
                api_key: "cbdf6ae760a463281149078853b6f643",
                query: query
            };

            return $http.jsonp(trustedUrl, {
                params: params
            }).then(function (response) {
                return response.data.results;
            }, function (error) {
                return $q.reject(error);
            });
        };

        self.getCategoryMovie = function (category) {

            var url = 'https://api.themoviedb.org/3/movie/' + category;
            var trustedUrl = $sce.trustAsResourceUrl(url);
            var params = {
                api_key: "cbdf6ae760a463281149078853b6f643"
            };

            return $http.jsonp(trustedUrl, {
                params: params
            }).then(function (response) {
                return response.data.results;
            }, function (error) {
                return $q.reject(error);
            });
        };

    }]);

    module.exports = moviesService.name;
})();