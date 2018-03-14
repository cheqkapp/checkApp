(function() {
    'use strict';

    angular
        .module('layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$cookies', '$scope', '$location','_', '$rootScope'];
    /* @ngInject */
    function LayoutController($cookies, $scope, $location, _, $rootScope) {
        var vm = this;
        $scope.signOut = signOut;
        $scope.changeRoute = changeRoute;
        $scope.menuToggle = menuToggle;
        $scope.showMenu = false;
        $rootScope.citeCount = 0;
        $rootScope.showCiteCount = false;
        activate();
        function activate() {
            console.log('LAYOUT ACTIVATED');
        }

        function signOut(){
            //remove all cookies
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
