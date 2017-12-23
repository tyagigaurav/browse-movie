(function () {
    'use strict';
    require('./footer.scss');

    FooterController.$inject = [];
    function FooterController(){

    };

    var FooterComponent = angular.module('app.common').component('footerComponent', {
        template: require('./footer.html'),
        bindings: {
        },
        controller: FooterController
    });

    module.exports = FooterComponent.name;
})();