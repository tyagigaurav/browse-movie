(function () {

    'use strict';

    var angular = require('angular');

    var pageLoader = angular.module('app').service('PageLoader', [function () {

        this.apply = function (helperText) {

            var element = document.querySelector('body');

            if (element) {
                var $el = angular.element(element);
                if (!$el.hasClass('loading-mask-container')) {
                    $el.addClass('loading-mask-container');
                    $el.prepend(
                        '<span id="loading-mask-body">' +
                        '<div class="loader-content">' +
                        '<div class="loader">' +
                        '</div>' +
                        '<div class="loader-text">' + helperText +
                        '</div>' +
                        '</div>' +
                        '<div id="loading-mask">' +
                        '</div>' +
                        '</span>');
                }
            }

        };

        this.remove = function () {

            var element = document.querySelector('body');

            if (element) {
                var $el = angular.element(element);
                $el.removeClass('loading-mask-container');
                var $mask = angular.element(element.querySelector('#loading-mask-body'))
                if ($mask) {
                    $mask.remove();
                }
            }

        };

    }]);

    module.exports = pageLoader.name;
})();