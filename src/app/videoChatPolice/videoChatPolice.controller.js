(function() {
    'use strict';

    angular
        .module('videoChatPolice')
        .controller('VideoChatPoliceController', VideoChatPoliceController);

    VideoChatPoliceController.$inject = ['$location','$uibModal','logger', '$cookies'];
    /* @ngInject */
    function VideoChatPoliceController($location,$uibModal,logger,$cookies) {
        var vm = this;
        vm.changeRoute = changeRoute;
        vm.driverData = $cookies.getObject('driver');

        vm.openCitation = function () {

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'citationModal.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return vm.violations;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
                logger.log(vm.selected);
            }, function () {
                logger.log('Modal dismissed at: ' + new Date());
            });
        };

        activate();

        function activate() {
            console.log('POLICE VIDEO CHAT ACTIVATED');
            violations();
        }

        function violations(){
            vm.violations = [
                {type:"Speeding",id:"speeding",additionalInfo:{id:"milesOverLimit",placeholder:"Speed"}},
                {type:"Illegal U-Turn",id:"illegalUturn"},
                {type:"Unsafe Speed",id:"unsafeSpeed"},
                {type:"Unsafe Lane Change",id:"unsafeLaneChange"}
            ];
        }

        function changeRoute(route) {
            $location.path(route);
        }

    }
})();

angular.module('videoChatPolice').controller('ModalInstanceCtrl', function ($uibModalInstance, items, logger) {
    var vm = this;
    vm.items = items;
    vm.selected = {};
    vm.form ={};

    vm.ok = function () {
        if (vm.selected.item !== undefined) {
            //post to citation service here
            $uibModalInstance.close(vm.selected.item);
            logger.success('Citation Signed!');
        } else {
            console.log('Violations Form Not In Scope');
        }
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
