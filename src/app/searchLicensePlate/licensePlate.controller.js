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
            console.log('LICENSE PLATE SEARCH ACTIVATED');
        }

        function changeView(isValid){
            if (isValid) {
                //call search service when ready

                $location.path('/searchDriver');
            }
        }
    }
})();
