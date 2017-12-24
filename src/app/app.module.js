(function () {

    require('./app.scss');

    var angular = require('angular');
    var routeConfig = require('./route-config');

    var common = require('./common/common.module');
    var components = require('./components/components.module');
    
    angular.module('app', [
        common,
        components
    ])
    .config(routeConfig);

})();