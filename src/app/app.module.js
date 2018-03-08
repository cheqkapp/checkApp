(function(){
    'use strict';

    const app = angular.module('app', [
        'ngCookies',
        'core',
        'angularSpinner',
        'layout',
        'welcome',
        'login',
        'licensePlate',
        'searchDriver',
        'videoChatPolice',
        'videoChatDriver',
        'citationSummary',
        'policeReport',
        'customerInformation',
        'garage',
        'ticketDetail',
        'payment'
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

            .when('/licensePlate',{
                templateUrl: 'app/searchLicensePlate/licensePlate.html',
                controller: 'LicensePlateController',
                controllerAs: 'vm',
                label: 'License Plate Search',
                appTitle: 'License Plate Search'
            })

            .when('/searchDriver',{
                templateUrl: 'app/searchDriver/searchDriver.html',
                controller: 'SearchDriverController',
                controllerAs: 'vm',
                label: 'Driver Search',
                appTitle: 'Driver Search'
            })

            .when('/videoChatPolice',{
                templateUrl: 'app/videoChatPolice/videoChatPolice.html',
                controller: 'VideoChatPoliceController',
                controllerAs: 'vm',
                label: 'Police Video Call',
                appTitle: 'Police Video Call'
            })

            .when('/videoChatDriver',{
                templateUrl: 'app/videoChatDriver/videoChatDriver.html',
                controller: 'VideoChatDriverController',
                controllerAs: 'vm',
                label: 'Driver Video Call',
                appTitle: 'Driver Video Call'
            })

            .when('/citationSummary',{
                templateUrl: 'app/citationSummary/citationSummary.html',
                controller: 'CitationSummaryController',
                controllerAs: 'vm',
                label: 'Citation Summary',
                appTitle: 'Citation Summary'
            })

            .when('/policeReport',{
                templateUrl: 'app/policeReport/policeReport.html',
                controller: 'PoliceReportController',
                controllerAs: 'vm',
                label: 'Police Report',
                appTitle: 'Police Report'
            })

            .when('/customerInformation',{
                templateUrl: 'app/customerInformation/customerInformation.html',
                controller: 'CustomerInformationController',
                controllerAs: 'vm',
                label: 'Customer Information',
                appTitle: 'Customer Information'
            })

            .when('/garage',{
                templateUrl: 'app/garage/garage.html',
                controller: 'GarageController',
                controllerAs: 'vm',
                label: 'Garage',
                appTitle: 'Garage'
            })

            .when('/ticketDetail',{
                templateUrl: 'app/ticketDetail/ticketDetail.html',
                controller: 'TicketDetailController',
                controllerAs: 'vm',
                label: 'Ticket Detail',
                appTitle: 'Ticket Detail'
            })

            .when('/payment',{
                templateUrl: 'app/payment/payment.html',
                controller: 'PaymentController',
                controllerAs: 'vm',
                label: 'Payment',
                appTitle: 'Payment'
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