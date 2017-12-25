(function () {

    require('./app.scss');

    var angular = require('angular');
    var routeConfig = require('./route-config');
    var localStorage = require('angular-local-storage');

    var common = require('./common/common.module');
    var components = require('./components/components.module');
    
    angular.module('app', [
        common,
        components,
        localStorage
    ])
    .config(routeConfig)
    .config(['$httpProvider', 'localStorageServiceProvider', function($httpProvider, localStorageServiceProvider) {

        $httpProvider.interceptors.push('HttpInterceptor');
    
        localStorageServiceProvider
        .setStorageType('localStorage')
        .setPrefix('MW');
      }]);

      require('./http-interceptor');

      /**************** Services *****************/
      require('./services/app-state.service');
      require('./services/page-loader.service');

})();