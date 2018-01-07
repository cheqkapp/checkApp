(function() {
    'use strict';

    angular
        .module('layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = [];
    /* @ngInject */
    function LayoutController() {
        activate();
        function activate() {
            console.log('LAYOUT ACTIVATED');
        }
    }
})();
