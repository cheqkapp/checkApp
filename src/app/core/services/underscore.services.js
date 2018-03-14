(function() {
    'use strict';

    angular
        .module('services')
        .factory('_', underscore);

    underscore.$inject = ['$window'];

    /* @ngInject */
    function underscore($window) {
        return $window._;
    }
})();