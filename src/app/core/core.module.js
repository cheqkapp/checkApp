(function () {
    'use strict';

    angular.module('core',[

        //Angular modules
        'ngRoute',
        'ngSanitize',

        'blocks.exception',
        'blocks.logger',
        'blocks.router',

        'ui.bootstrap'

    ]);

})();