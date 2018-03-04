(function() {
    'use strict';

    angular
        .module('services')
        .service('DriversService', DriversService);

    DriversService.$inject = ['$http','responseHandler'];

    /* @ngInject */
    function DriversService($http,responseHandler) {
        var services ={
            findDriver: findDriver
        };

        return services;

        function findDriver(params){
            return $http({
                method:'GET',
                url: 'https://tm5s5q69cj.execute-api.us-east-2.amazonaws.com/dev/drivers',
                params: params
            }).then(responseHandler.successHandler,responseHandler.errorHandler)
        }
    }
})();