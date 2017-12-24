(function () {

    'use strict';

    var angular = require('angular');
    var _ = require('lodash');

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

            this.addInWishlist = function (type, data) {
                var wishlist = this.getWishlist();
                var wishlistByType = wishlist.type;
                if(wishlistByType.data.length > 0){
                    if(_.isEmpty(_.find(wishlistByType, {'id': data.id}))){
                        wishlistByType.push(data);
                    }
                }else{
                    wishlistByType = [];
                }
                wishlist.type = wishlistByType;
                setInStorage(keys.wishlist, wishlist);
            };

            this.removeFromWishlist = function (type, id) {
                var wishlist = this.getWishlist();
                var wishlistByType = wishlist.type;
                if(wishlistByType.data.length > 0){
                    wishlistByType = _.reject(wishlistByType, {'id': id});
                }else{
                    wishlistByType = [];
                }
                wishlist.type = wishlistByType;
                setInStorage(keys.wishlist, wishlist);
            };

            this.getWishlist = function () {
                return getFromStorage(keys.wishlist);
            };

            this.clearWishlist = function(){
                removeFromStorage(keys.wishlist);
            };

            this.clearAll = function() {
                return localStorageService.clearAll();
            };
            
        }]);

    module.exports = appState.name;
})();