(function () {
    'use strict';
    require('./search-bar.scss');

    SearchBarController.$inject = ['$scope', '$state', 'MoviesService', '$stateParams'];
    function SearchBarController($scope, $state, MoviesService, $stateParams) {
        var vm = this;

        vm.$onInit = function () {
        };

        vm.search = function(){
             vm.filterUpdated({category: vm.category, searchText: vm.keyword});
        }
    };

    var searchBarComponent = angular.module('app.common').component('mwSearchBar', {
        template: require('./search-bar.html'),
        bindings: {
            filterUpdated: '&'
        },
        controller: SearchBarController
    });

    module.exports = searchBarComponent.name;
})();