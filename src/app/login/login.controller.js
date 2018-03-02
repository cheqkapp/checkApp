(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','UserService','usSpinnerService','$cookies'];
    /* @ngInject */
    function LoginController($location, UserService, usSpinnerService, $cookies) {
        var vm = this;
        vm.changeView = changeView;
        vm.errorMessage = "";

        activate();

        function activate() {
            console.log('LOGIN ACTIVATED');
        }

        function changeView(isValid){
            if (isValid) {
                usSpinnerService.spin('waiting');
                UserService.checkUser({userId:vm.email}).then(function(data){
                    usSpinnerService.stop('waiting');
                    if(!_.isEmpty(data)){
                        vm.errorMessage = "";
                        console.log(data);
                        $cookies.putObject('user',data);
                        console.log($cookies.getObject(user));
                    }else{
                        vm.errorMessage = "Invalid User Credentials, please retry."
                    }
                });

                //called login service when created

                //$location.path('/licensePlate');
            }
        }
    }
})();
