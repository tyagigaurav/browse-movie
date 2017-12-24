(function () {

    require('./app.scss');

    var angular = require('angular');
    var routeConfig = require('./route-config');
    require('angular-local-storage');

    var common = require('./common/common.module');
    var components = require('./components/components.module');
    
    angular.module('app', [
        common,
        components,
        'LocalStorageModule',
    ])
    .config(routeConfig)
    .config(['$httpProvider', 'localStorageServiceProvider', function($httpProvider, localStorageServiceProvider) {

        $httpProvider.interceptors.push('HttpInterceptor');
    
        localStorageServiceProvider
        .setStorageType('sessionStorage')
        .setPrefix('MW');
      }]);

      require('./http-interceptor');

      /**************** Services *****************/
      require('./services/app-state.service');
      require('./services/page-loader.service');

})();