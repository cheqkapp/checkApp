(function() {
    'use strict';

    angular
        .module('searchDriver')
        .controller('SearchDriverController', SearchDriverController);

    SearchDriverController.$inject = ['$location'];
    /* @ngInject */
    function SearchDriverController($location) {
        var vm = this;
        vm.changeView = changeView;

        activate();

        function activate() {
            console.log('DRIVER SEARCH ACTIVATED');
        }

        function changeView(isValid){
            if (isValid) {
                //call search service when ready

                $location.path('/videoChatPolice');
            }
        }
    }
})();
