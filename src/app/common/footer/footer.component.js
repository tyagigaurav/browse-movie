(function () {
    'use strict';
    require('./footer.scss');

    function FooterController(){

    };

    var FooterComponent = angular.module('app.common').component('mwFooter', {
        template: require('./footer.html'),
        bindings: {
        },
        controller: [FooterController]
    });

    module.exports = FooterComponent.name;
})();