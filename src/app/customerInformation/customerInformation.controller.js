(function() {
    'use strict';

    angular
        .module('customerInformation')
        .controller('CustomerInformationController', CustomerInformationController);

    CustomerInformationController.$inject = ['$location','$uibModal', '$cookies','logger', 'usSpinnerService', 'DriversService'];
    /* @ngInject */
    function CustomerInformationController($location,$uibModal, $cookies, logger, usSpinnerService, DriversService) {
        var vm = this;
        vm.changeView = changeView;
        vm.userInfo = $cookies.getObject('users');
        vm.customerData = {};
        vm.openDriversLicense = function () {

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'drivers-license-title',
                ariaDescribedBy: 'drivers-license-body',
                templateUrl: 'driversLicense.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return {};
                    }
                }
            });

            modalInstance.result.then(function () {
                logger.log('Drivers License Modal Activated');
            }, function () {
                logger.log('Modal dismissed at: ' + new Date());
            });
        };

        vm.openInsurance = function () {

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'driver-insurance-title',
                ariaDescribedBy: 'driver-insurance-body',
                templateUrl: 'driverInsurance.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return {};
                    }
                }
            });

            modalInstance.result.then(function () {
                logger.log('Drivers License Modal Activated');
            }, function () {
                logger.log('Modal dismissed at: ' + new Date());
            });
        };

        vm.openRegistration = function () {

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'driver-registration-title',
                ariaDescribedBy: 'driver-registration-body',
                templateUrl: 'driverRegistration.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return {};
                    }
                }
            });

            modalInstance.result.then(function () {
                logger.log('Drivers License Modal Activated');
            }, function () {
                logger.log('Modal dismissed at: ' + new Date());
            });
        };

        vm.openCarInfo = function () {

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'car-info-title',
                ariaDescribedBy: 'car-info-body',
                templateUrl: 'driverCarInfo.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return {};
                    }
                }
            });

            modalInstance.result.then(function () {
                logger.log('Drivers License Modal Activated');
            }, function () {
                logger.log('Modal dismissed at: ' + new Date());
            });
        };

        activate();

        function getCustomerData(){
            usSpinnerService.spin('waiting');
            DriversService.findDriver({plateNumber:vm.userInfo.licensePlateId}).then(function(data){
                usSpinnerService.stop('waiting');
                if(!_.isEmpty(data)){
                    vm.errorMessage = "";
                    $cookies.putObject('customer',data.data.Item);
                    vm.customerData = $cookies.getObject('customer');
                    console.log(vm.customerData);
                }else{
                    vm.errorMessage = "License Plate is not in our system"
                }
            });

        }

        function activate() {
            console.log('CUSTOMER INFO ACTIVATED');
            getCustomerData();
        }

        function changeView(route){
            $location.path('/'+route);
        }
    }
})();

angular.module('customerInformation').controller('ModalInstanceCtrl', function ($uibModalInstance, logger) {
    var vm = this;

    vm.form ={};

    vm.ok = function () {
        $uibModalInstance.dismiss('cancel');
        // if (vm.selected.item !== undefined) {
        //     //post to citation service here
        //     $uibModalInstance.close(vm.selected.item);
        //     logger.success('Citation Signed!');
        // } else {
        //     console.log('Violations Form Not In Scope');
        // }
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
