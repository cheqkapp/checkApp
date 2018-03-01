(function() {
    'use strict';

    angular
        .module('citationSummary')
        .controller('CitationSummaryController', CitationSummaryController);

    CitationSummaryController.$inject = ['$location'];

    /* @ngInject */
    function CitationSummaryController($location) {
        var vm = this;
        vm.changeRoute = changeRoute;

        activate();

        function activate() {
            console.log('CITATION SUMMARY ACTIVATED');
        }

        function changeRoute(route){
            $location.path(route);
        }
    }
})();