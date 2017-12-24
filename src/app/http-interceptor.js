(function () {
    'use strict';

    var angular = require('angular');

    var httpIntrcptr = angular.module('app').factory('HttpInterceptor', ['$q', '$rootScope', 'PageLoader', function ($q, $rootScope, PageLoader) {
        return {
            request: function (config) {

                if($rootScope.requestCount){
                    $rootScope.request++;
                }else{
                    $rootScope.request = 1;
                }

                PageLoader.apply("Loading Data...");

                return config;
            },
            requestError: function (rejection) {

                $rootScope.request--;
                if($rootScope.request === 0){
                    PageLoader.remove();
                }
                return $q.reject(rejection);
            },
            response: function (response) {

                $rootScope.request--;
                if($rootScope.request === 0){
                    PageLoader.remove();
                }
                return response;
            },
            responseError: function (rejection) {

                $rootScope.request--;
                if($rootScope.request === 0){
                    PageLoader.remove();
                }
                return $q.reject(rejection);
            }
        };
    }]);

    module.exports = httpIntrcptr.name;
})();