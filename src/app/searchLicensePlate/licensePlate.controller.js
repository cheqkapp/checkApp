(function() {
    'use strict';

    angular
        .module('licensePlate')
        .controller('LicensePlateController', LicensePlateController);

    LicensePlateController.$inject = ['$location'];
    /* @ngInject */
    function LicensePlateController($location) {
        var vm = this;
        vm.changeView = changeView;

        activate();

        function activate() {
            console.log('WELCOME ACTIVATED');
        }

        function changeView(){
            $location.path('/videoChatPolice');
        }
    }
})();
