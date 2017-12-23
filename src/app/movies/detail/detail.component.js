(function () {
    'use strict';
    var angular = require('angular');
    require('./detail.component.scss');
    require('./detail.component.service');

    var detailController = function ($scope, $http, $state, detailComponentService, $stateParams) {
        var vm = this;
        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.active = 0;

        vm.$onInit = function () {
            detailComponentService.getFilterredMovie($stateParams.filter).then(function (data) {
                vm.filteredData = data.data.results;
                console.log(vm.filteredData);
            }, function (error) {
                vm.errMsg = error;
            });
        };
    };

    var detailComp = angular.module('journey.module').component('detailComponent', {
        template: require('./detail.component.html'),
        controllerAs: 'detail',
        controller: ['$scope', '$http', '$state', 'detailComponentService', '$stateParams', detailController]
    });
    module.exports = detailComp.name;
})();