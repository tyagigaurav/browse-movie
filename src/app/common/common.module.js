(function () {

    'use strict';

    var angular = require('angular');
    
    var CommonModule = angular.module('app.common', [

    ]);

    require('./footer/footer.component');
    require('./header/header.component');

    module.exports = CommonModule.name;

})();