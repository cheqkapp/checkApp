(function(){
    'use strict';

    const app = angular.module('app', [
        'ngCookies',
        'core',
        'layout',
        'welcome',
        'login'
    ]);

    app
        .constant('toastr', toastr)
        .constant('moment', moment);

    app
        .config(routeConfig)
        .config(toastrConfig)
        .config(configure);

    var about = {
        appErrorPrefix: '[Default] ', //Configure the exceptionHandler decorator
        appTitle: 'Default',
        version: '1.0.0'
    };

    app.value('about', about);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'app/welcome/welcome.html',
                controller: 'WelcomeController',
                controllerAs: 'vm',
                label: 'Welcome',
                appTitle: 'Welcome'
            })

            .when('/login',{
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                label: 'Login',
                appTitle: 'Login'
            })

            .otherwise({
                redirectTo: '/',
                label: 'Welcome',
                appTitle: 'Welcome'
            });
    }

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-left';
    }

    function configure($logProvider, $routeProvider, routehelperConfigProvider, exceptionConfigProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'Home';

        // Configure the common exception handler
        exceptionConfigProvider.config.appErrorPrefix = about.appErrorPrefix;
    }



})();