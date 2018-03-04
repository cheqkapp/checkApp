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
                        $cookies.putObject('users',data.data.Item);
                        vm.userInfo = $cookies.getObject('users');
                        if(vm.userInfo.userType === "officer"){
                            $location.path('/licensePlate');
                        }else{
                            $location.path('/customerInformation');
                        }

                    }else{
                        vm.errorMessage = "Invalid User Credentials, please retry."
                    }
                });
            }
        }
    }
})();
