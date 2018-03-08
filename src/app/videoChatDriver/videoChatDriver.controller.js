(function() {
    'use strict';

    angular
        .module('videoChatDriver')
        .controller('VideoChatDriverController', VideoChatDriverController);

    VideoChatDriverController.$inject = ['$location', '$uibModal', 'logger','$timeout'];

    /* @ngInject */
    function VideoChatDriverController($location, $uibModal, logger, $timeout) {
        var vm = this;
        vm.changeRoute = changeRoute;
        vm.ticketpopup = false;
        vm.signForm = signForm;

        activate();

        function activate() {
            console.log('DRIVER VIDEO CHAT ACTIVATED');
            $timeout( function () {
                vm.ticketpopup = true;
            }, 7000 );
        }

        function changeRoute(route) {
            $location.path(route);
        }

        function signForm(){
            vm.ticketpopup = false;
        }
    }
})();