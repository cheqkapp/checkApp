(function() {
    'use strict';

    angular
        .module('ticketDetail')
        .controller('TicketDetailController', TicketDetailController);

    TicketDetailController.$inject = ['$location', '$uibModal', 'logger','$timeout'];

    /* @ngInject */
    function TicketDetailController($location, $uibModal, logger, $timeout) {
        var vm = this;
        vm.changeRoute = changeRoute;


        activate();

        function activate() {
            console.log('TICKET DETAIL ACTIVATED');
        }

        function changeRoute(route) {
            $location.path(route);
        }
    }
})();