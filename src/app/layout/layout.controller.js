(function() {
    'use strict';

    angular
        .module('layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$cookies', '$scope', '$location','_', '$window'];
    /* @ngInject */
    function LayoutController($cookies, $scope, $location, _, $window) {
        var vm = this;
        $scope.signOut = signOut;
        $scope.changeRoute = changeRoute;
        $scope.menuToggle = menuToggle;
        $scope.showMenu = false;
        activate();
        function activate() {
            console.log('LAYOUT ACTIVATED');
        }

        function signOut(){
            //remove all cookies
            console.log($window);
            _.mapObject($cookies.getAll(), function(value, key) {
                $cookies.remove(key);
                return value
            });
            $location.path('/');
            $scope.showMenu = false;
        }

        function changeRoute(route) {
            $location.path('/'+route);
            $scope.showMenu = false;
        }

        function menuToggle() {
            $scope.showMenu = !$scope.showMenu;
        }
    }
})();
