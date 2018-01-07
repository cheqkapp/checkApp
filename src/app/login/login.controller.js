(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location'];
    /* @ngInject */
    function LoginController($location) {
        var vm = this;
        vm.changeView = changeView;


        activate();

        function activate() {
            console.log('LOGIN ACTIVATED');
        }

        function changeView(isValid){
            if (isValid) {
                //called login service when created

                $location.path('/licensePlate');
            }
        }
    }
})();
