(function() {
    'use strict';

    angular
        .module('searchDriver')
        .controller('SearchDriverController', SearchDriverController);

    SearchDriverController.$inject = ['$location','usSpinnerService', '$cookies'];
    /* @ngInject */
    function SearchDriverController($location,usSpinnerService, $cookies) {
        var vm = this;
        vm.changeView = changeView;
        vm.errorMessage = "";
        vm.driverData = $cookies.getObject('driver');

        activate();

        function activate() {
            console.log('DRIVER SEARCH ACTIVATED');
            getDrivers();
        }

        function getDrivers(){
            vm.drivers = [{firstName:vm.driverData.firstName,lastName:vm.driverData.lastName}];
            _.each(vm.driverData.additionalDrivers,function(driver){
                vm.drivers.push({firstName:driver.firstName,lastName:driver.lastName});
            });


        }

        function changeView(isValid){
            if (isValid) {
                //call search service when ready
                vm.errorMessage= "";
                $location.path('/videoChatPolice');
            }else{
                vm.errorMessage= "Please Select a Driver";
            }
        }
    }
})();
