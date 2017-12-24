(function () {

    'use strict';

    var angular = require('angular');

    var appState = angular.module('app').service('AppState', ['localStorageService', function (localStorageService) {

            var keys = {
                wishlist: 'WISHLIST',
                filteredData: 'LIST'
            };

            function setInStorage(key, value) {
                localStorageService.set(key, value);
            };

            function getFromStorage(key) {
                return localStorageService.get(key);
            };

            function removeFromStorage(key) {
                return localStorageService.remove(key);
            };

            this.getFilteredData = function () {
               return getFromStorage(keys.filteredData);
            };

            this.setFilteredData = function (type, data) {
                var obj = {
                    type: type,
                    data: data
                };
                setInStorage(keys.filteredData, obj);
            };

            this.setWishlist = function (data) {
                setInStorage(keys.wishlist, data);
            };

            this.getWishlist = function () {
                return getFromStorage(keys.wishlist);
            };

            this.clearAll = function() {
                return localStorageService.clearAll();
            };
        }]);

    module.exports = appState.name;
})();