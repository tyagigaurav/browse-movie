(function () {
    'use strict';
    require('./header.scss');

    HeaderController.$inject = [];
    function HeaderController(){

    };

    var HeaderComponent = angular.module('app.common').component('headerComponent', {
        template: require('./header.html'),
        bindings: {
        },
        controller: HeaderController
    });

    module.exports = HeaderComponent.name;
})();