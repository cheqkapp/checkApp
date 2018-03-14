(function() {
    'use strict';

    angular
        .module('ticketDetail')
        .controller('TicketDetailController', TicketDetailController);

    TicketDetailController.$inject = ['$location', '$uibModal', 'logger','$timeout', '$rootScope'];

    /* @ngInject */
    function TicketDetailController($location, $uibModal, logger, $timeout, $rootScope) {
        var vm = this;
        vm.changeRoute = changeRoute;

        activate();

        function activate() {
            console.log('TICKET DETAIL ACTIVATED');
            $rootScope.citeCount = $rootScope.citeCount + 1;
            $rootScope.showCiteCount = true;
        }

        function changeRoute(route) {
            $location.path(route);
        }
    }
})();