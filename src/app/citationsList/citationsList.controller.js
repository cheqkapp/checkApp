(function() {
    'use strict';

    angular
        .module('citationList')
        .controller('CitationListController', CitationListController);

    CitationListController.$inject = ['$location'];

    /* @ngInject */
    function CitationListController($location) {
        var vm = this;
        vm.changeRoute = changeRoute;

        activate();

        function activate() {
            console.log('CITATION LIST ACTIVATED');
        }

        function changeRoute(route){
            $location.path(route);
        }
    }
})();