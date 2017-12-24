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

        this.setFilteredData = function (type, category, data) {
            var obj = {
                type: type,
                category: category,
                data: data
            };
            setInStorage(keys.filteredData, obj);
        };

        this.addInWishlist = function (type, id) {
            var wishlist = this.getWishlist();
            if (!wishlist) {
                wishlist = {};
            }
            if(!wishlist[type]){
                wishlist[type] = [];
            }
            var wishlistByType = wishlist[type];
            if (wishlistByType.indexOf(id) == -1) {
                wishlistByType.push(id);
            }
            wishlist[type] = wishlistByType;
            setInStorage(keys.wishlist, wishlist);
        };

        this.removeFromWishlist = function (type, id) {
            var wishlist = this.getWishlist();
            if (!wishlist) {
                wishlist = {};
            }
            if(!wishlist[type]){
                wishlist[type] = [];
            }
            var wishlistByType = wishlist[type];
            if (wishlistByType.length > 0) {
                var index = wishlistByType.indexOf(id);
                if (index > -1) {
                    wishlistByType.splice(index, 1);
                }
            } else {
                wishlistByType = [];
            }
            wishlist[type] = wishlistByType;
            setInStorage(keys.wishlist, wishlist);
        };

        this.getWishlist = function () {
            return getFromStorage(keys.wishlist);
        };

        this.clearWishlist = function () {
            removeFromStorage(keys.wishlist);
        };

        this.clearAll = function () {
            return localStorageService.clearAll();
        };

    }]);

    module.exports = appState.name;
})();