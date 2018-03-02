(function() {
    'use strict';

    angular
        .module('helpers')
        .factory('responseHandler', responseHandler);

    responseHandler.$inject = [ 'logger', '$cookies'];

    /* @ngInject */
    function responseHandler (logger,$cookies) {

        var responseHandler = {
            successHandler: successHandler,
            errorHandler: errorHandler
        };

        return responseHandler;

        function successHandler(response){
            return response;
        }

        function errorHandler(response){
            logger.error('Error while fetching the data on the ' + $cookies.get('currentPage') + ' page.', response, $cookies.get('currentPage') + 'Error');
            _.extend(response, { data: { succeeded: false } });

            return response;
        }
    }
})();