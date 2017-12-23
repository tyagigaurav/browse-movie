(function () {
    'use strict';

    var detailComponentService = angular.module('journey.module').service('detailComponentService', ['$q', '$http','CONFIG','$rootScope','$sce', function ($q, $http, CONFIG, $rootScope,$sce) {

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
  }]);

    module.exports = detailComponentService.name;
})();