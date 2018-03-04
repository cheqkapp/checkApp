(function() {
    'use strict';

    angular
        .module('licensePlate')
        .controller('LicensePlateController', LicensePlateController);

    LicensePlateController.$inject = ['$location','DriversService','usSpinnerService','$cookies'];
    /* @ngInject */
    function LicensePlateController($location, DriversService, usSpinnerService, $cookies) {
        var vm = this;
        vm.changeView = changeView;
        vm.errorMessage = "";

        activate();

        function activate() {
            console.log('LICENSE PLATE SEARCH ACTIVATED');
        }

        function changeView(isValid){
            if (isValid) {
                usSpinnerService.spin('waiting');
                DriversService.findDriver({plateNumber:vm.plateNumber}).then(function(data){
                    usSpinnerService.stop('waiting');
                    if(!_.isEmpty(data)){
                        vm.errorMessage = "";
                        $cookies.putObject('driver',data.data.Item);
                        console.log($cookies.getObject('driver'));
                        $location.path('/searchDriver');
                    }else{
                        vm.errorMessage = "License Plate is not in our system"
                    }
                });
            }
        }
    }
})();
