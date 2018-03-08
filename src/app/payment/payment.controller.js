(function() {
    'use strict';

    angular
        .module('payment')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['$location', '$uibModal', 'logger','$timeout'];

    /* @ngInject */
    function PaymentController($location, $uibModal, logger, $timeout) {
        var vm = this;
        vm.changeRoute = changeRoute;


        activate();

        function activate() {
            console.log('PAYMENT ACTIVATED');
        }

        function changeRoute(route) {
            $location.path(route);
        }
    }
})();