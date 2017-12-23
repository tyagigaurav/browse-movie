(function () {
    'use strict';

    var homeComponentService = angular.module('journey.module').service('homeComponentService', ['$q', '$http','CONFIG','$rootScope','$sce', function ($q, $http, CONFIG, $rootScope,$sce) {

        var self = this;

        self.getFilterredMovie = function (searchText) {
            
            var url = 'https://api.themoviedb.org/3/search/multi';
            var trustedUrl = $sce.trustAsResourceUrl(url);
            var params = {
                api_key: "cbdf6ae760a463281149078853b6f643",
                language: "en-US",
                page: 1,
                include_adult: false,
                query: searchText
            }

            var defer = $q.defer(); 

            $http.jsonp(trustedUrl, {params: params}).then(function(response){
                if (response && response.status === 200) {
                    return defer.resolve(response);
                }
            }, function (response) {
                    return defer.reject("An error has occurred. Please close this application and try again later. Our apologies for any inconvenience caused.");
            });
            return defer.promise;
        };

        self.getPopularMovie = function (category) {
            
            var url = 'https://api.themoviedb.org/3/movie/popular';
            var trustedUrl = $sce.trustAsResourceUrl(url);
            var params = {
                api_key: "cbdf6ae760a463281149078853b6f643",
                language: "en-US",
                page: 1
            }

            var defer = $q.defer(); 

            $http.jsonp(trustedUrl, {params: params}).then(function(response){
                if (response && response.status === 200) {
                    return defer.resolve(response);
                }
            }, function (response) {
                    return defer.reject("An error has occurred. Please close this application and try again later. Our apologies for any inconvenience caused.");
            });
            return defer.promise;
        };

        self.getUpcomingMovie = function () {
            
            var url = 'https://api.themoviedb.org/3/movie/upcoming';
            var trustedUrl = $sce.trustAsResourceUrl(url);
            var params = {
                api_key: "cbdf6ae760a463281149078853b6f643",
                language: "en-US",
                page: 1
            }

            var defer = $q.defer(); 

            $http.jsonp(trustedUrl, {params: params}).then(function(response){
                if (response && response.status === 200) {
                    return defer.resolve(response);
                }
            }, function (response) {
                    return defer.reject("An error has occurred. Please close this application and try again later. Our apologies for any inconvenience caused.");
            });
            return defer.promise;
        };

        self.getNowplayingMovie = function () {
            
            var url = 'https://api.themoviedb.org/3/movie/now_playing';
            var trustedUrl = $sce.trustAsResourceUrl(url);
            var params = {
                api_key: "cbdf6ae760a463281149078853b6f643",
                language: "en-US",
                page: 1
            }

            var defer = $q.defer(); 

            $http.jsonp(trustedUrl, {params: params}).then(function(response){
                if (response && response.status === 200) {
                    return defer.resolve(response);
                }
            }, function (response) {
                    return defer.reject("An error has occurred. Please close this application and try again later. Our apologies for any inconvenience caused.");
            });
            return defer.promise;
        };

        self.getTopRatedMovie = function () {

            var url = 'https://api.themoviedb.org/3/movie/top_rated';
            var trustedUrl = $sce.trustAsResourceUrl(url);
            var params = {
                api_key: "cbdf6ae760a463281149078853b6f643",
                language: "en-US",
                page: 1
            }

            var defer = $q.defer(); 

            $http.jsonp(trustedUrl, {params: params}).then(function(response){
                if (response && response.status === 200) {
                    return defer.resolve(response);
                }
            }, function (response) {
                    return defer.reject("An error has occurred. Please close this application and try again later. Our apologies for any inconvenience caused.");
            });
            return defer.promise;
        };

        self.addNewCode = function (label, code, type, securityParams) {
            var apiURL = CONFIG.apiUrl + '/master/code/add/' + type;

            var payload = {
                "label": label,
                "code": code
            };
            
            if (!$rootScope.integrationsActive) {
                return $q.resolve(true);
            }

            var defer = $q.defer();

            $http({
                method: 'POST',
                url: apiURL,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: payload,
                params: securityParams
            }).then(function (response) {
                if (response && response.status === 200) {
                    return defer.resolve();
                }
            }, function (response) {
                if (response && response.data.status === 8000) {
                    return defer.reject("Entered code already exist. Please verify and try again.");
                }
                else if (response && response.data.status === 8001) {
                    return defer.reject("Entered label already exist. Please verify and try again.");
                }
                 else {
                    return defer.reject("An error has occurred. Please close this application and try again later. Our apologies for any inconvenience caused.");
                }
            });
            return defer.promise;
        };

        

    }]);

    module.exports = homeComponentService.name;
})();