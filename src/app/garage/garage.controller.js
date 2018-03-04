(function() {
    'use strict';

    angular
        .module('garage')
        .controller('GarageController', GarageController);

    GarageController.$inject = ['$location','$timeout'];
    /* @ngInject */
    function GarageController($location, $timeout) {
        var vm = this;
        vm.changeView = changeView;
        vm.incomingCall = false;
        vm.rejectIncomingCall = rejectIncomingCall;

        activate();

        function activate() {
            console.log('GARAGE ACTIVATED');
            $timeout( function () {
                vm.incomingCall = true;
            }, 7000 );
        }

        function changeView(route){
            $location.path('/'+route);
        }

        function rejectIncomingCall(){
            vm.incomingCall = false;
            console.log(vm.incomingCall);
        }
    }
})();