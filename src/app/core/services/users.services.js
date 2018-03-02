(function() {
    'use strict';

    angular
        .module('services')
        .service('UserService', UserService);

    UserService.$inject = ['$http','responseHandler'];

    /* @ngInject */
    function UserService($http,responseHandler) {
        var services ={
            checkUser: checkUser
        };

        return services;

        function checkUser(params){
            return $http({
                method:'GET',
                url: 'https://tm5s5q69cj.execute-api.us-east-2.amazonaws.com/dev/users',
                params: params
            }).then(responseHandler.successHandler,responseHandler.errorHandler)
        }
    }
})();