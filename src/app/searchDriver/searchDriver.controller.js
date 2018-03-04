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

        activate();

        function activate() {
            console.log('DRIVER SEARCH ACTIVATED');
            getDrivers();
        }

        function getDrivers(){
            vm.drivers = $cookies.getObject('driver');
            if(!_.isArray($cookies.getObject('driver'))){
               vm.drivers = [$cookies.getObject('driver')];
            }
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
