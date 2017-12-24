(function () {

    'use strict';

    var angular = require('angular');

    var appState = angular.module('app').service('AppState', ['localStorageService', function (localStorageService) {

        var keys = {
            watchlist: 'WATCHLIST',
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

        this.addInWatchlist = function (type, id) {
            var watchlist = this.getWatchlist();
            if (!watchlist) {
                watchlist = {};
            }
            if(!watchlist[type]){
                watchlist[type] = [];
            }
            var watchlistByType = watchlist[type];
            if (watchlistByType.indexOf(id) == -1) {
                watchlistByType.push(id);
            }
            watchlist[type] = watchlistByType;
            setInStorage(keys.watchlist, watchlist);
        };

        this.removeFromWatchlist = function (type, id) {
            var watchlist = this.getWatchlist();
            if (!watchlist) {
                watchlist = {};
            }
            if(!watchlist[type]){
                watchlist[type] = [];
            }
            var watchlistByType = watchlist[type];
            if (watchlistByType.length > 0) {
                var index = watchlistByType.indexOf(id);
                if (index > -1) {
                    watchlistByType.splice(index, 1);
                }
            } else {
                watchlistByType = [];
            }
            watchlist[type] = watchlistByType;
            setInStorage(keys.watchlist, watchlist);
        };

        this.getWatchlist = function () {
            return getFromStorage(keys.watchlist);
        };

        this.clearWatchlist = function () {
            removeFromStorage(keys.watchlist);
        };

        this.clearAll = function () {
            return localStorageService.clearAll();
        };

    }]);

    module.exports = appState.name;
})();