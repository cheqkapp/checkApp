(function() {
    'use strict';

    angular
        .module('welcome')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$location'];
    /* @ngInject */
    function WelcomeController($location) {
        var vm = this;
        vm.changeView = changeView;

        activate();

        function activate() {
            console.log('WELCOME ACTIVATED');
        }

        function changeView(){
            $location.path('/login');
        }
    }
})();
