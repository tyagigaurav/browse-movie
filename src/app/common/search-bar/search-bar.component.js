(function () {
    'use strict';
    require('./search-bar.scss');

    function SearchBarController($scope, $state, MoviesService, $stateParams) {
        var vm = this;

        vm.$onInit = function () {
            vm.category = 'movie';
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
        controller: ['$scope', '$state', 'MoviesService', '$stateParams', SearchBarController]
    });

    module.exports = searchBarComponent.name;
})();