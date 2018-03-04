(function() {
    'use strict';

    angular
        .module('layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$cookies'];
    /* @ngInject */
    function LayoutController($cookies) {
        var vm = this;
        vm.signOut = signOut;
        activate();
        function activate() {
            console.log('LAYOUT ACTIVATED');
        }

        function signOut(){
            //remove all cookies
            _.object(_.map($cookies.getAll(), function(value, key) {
                $cookies.remove(key);
                return value
            }));
            $window.location.href = '/';
        }
    }
})();
