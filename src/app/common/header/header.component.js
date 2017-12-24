(function () {
    'use strict';
    require('./header.scss');

    function HeaderController(){

    };

    var HeaderComponent = angular.module('app.common').component('mwHeader', {
        template: require('./header.html'),
        bindings: {
        },
        controller: [HeaderController]
    });

    module.exports = HeaderComponent.name;
})();