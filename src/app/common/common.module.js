(function () {

    'use strict';

    var angular = require('angular');
    
    var CommonModule = angular.module('app.common', [
        
    ]);

    require('./footer/footer.component');
    require('./header/header.component');
    require('./search-bar/search-bar.component');

    module.exports = CommonModule.name;

})();