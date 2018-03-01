(function() {
    'use strict';

    angular
        .module('policeReport')
        .controller('PoliceReportController', PoliceReportController);

        PoliceReportController.$inject = ['$location'];

    /* @ngInject */
    function PoliceReportController($location) {
        var vm = this;
        vm.changeRoute = changeRoute;
        vm.submitForm = submitForm;

        activate();

        function activate() {
            console.log('POLICE REPORT ACTIVATED');
            offenses()
        }

        function changeRoute(route){
            $location.path(route);
        }

        function submitForm(valid){
            console.log(valid);
        }

        function offenses(){
            //make ajax call
            vm.offenses = [
                "Select Offense",
                "Speeding 10-15mph over",
                "Illegal Lane Change",
                "Illegal U-Turn"
            ];
        }

    }
})();