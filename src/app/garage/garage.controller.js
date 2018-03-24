(function() {
    'use strict';

    angular
        .module('garage')
        .controller('GarageController', GarageController);

    GarageController.$inject = ['$location','$timeout', '$cookies'];
    /* @ngInject */
    function GarageController($location, $timeout, $cookies) {
        var vm = this;
        vm.changeView = changeView;
        vm.incomingCall = false;
        vm.userInfo = $cookies.getObject('customer');
        vm.rejectIncomingCall = rejectIncomingCall;

        activate();

        function activate() {
            console.log('GARAGE ACTIVATED');
            console.log(vm.userInfo);
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