(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = [];
    /* @ngInject */
    function LoginController() {
        activate();
        function activate() {
            console.log('LOGIN ACTIVATED');
        }
    }
})();
