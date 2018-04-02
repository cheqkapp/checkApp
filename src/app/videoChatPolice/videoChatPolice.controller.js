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
                controller: 'ModalInstanceCitationCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return vm.violations;
                    }
                }
            });

            modalInstance.result.then(function (selectedItems) {
                vm.selected = selectedItems;
                logger.log(vm.selected);
            }, function () {
                logger.log('Modal dismissed at: ' + new Date());
            });
        };

        vm.openDocument = function(image){

            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'recordView',
                ariaDescribedBy: 'recordViewBody',
                templateUrl: 'viewDocument.html',
                controller: 'ModalDocumentInstanceCtrl',
                controllerAs: 'vm',
                resolve: {
                    items: function () {
                        return image;
                    }
                }
            });

            modalInstance.result.then(function () {
               logger.log('image viewed');
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

angular.module('videoChatPolice').controller('ModalInstanceCitationCtrl', function ($uibModalInstance, items, logger, $location) {
    var vm = this;
    vm.items = items;
    vm.selected = {};
    vm.selected.items = [];
    vm.form ={};

    vm.addRemoveViolation = function(violation){
        var selectedItems = _.find(vm.selected.items, function(vitem) {return vitem.id === violation.id;});
        if(selectedItems === undefined) {
            vm.selected.items.push(violation);
        }else{
            vm.selected.items =  vm.selected.items.filter(function( obj ) {return obj.id !== selectedItems.id;});
        }
    };

    vm.ok = function () {
       if (vm.selected.items.length > 0) {
            //post to citation service here
            $uibModalInstance.close(vm.selected.items);
            logger.success('Citation Signed!');
           $location.path('policeReport');
        } else {
            console.log('Violations Form Not In Scope');
        }
    };

    vm.cancel = function () {
        console.log(vm.selected);
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('videoChatPolice').controller('ModalDocumentInstanceCtrl', function ($uibModalInstance, items) {
    var vm = this;
    vm.item = items;

    console.log(items);

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
