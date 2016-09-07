// import angular from 'angular';
// import ngRoute from 'angular-route';
// import ngResource from 'angular-resource';
// import ngAnimate from 'angular-animate';
// import bootstrap from 'bootstrap';

require('../styles/main.scss');
require('angular-loading-bar/build/loading-bar.min.css');
// require('bootstrap/dist/css/bootstrap.css');

window.moment = require('moment');
var angular = require('angular');

require('angular-route');
require('angular-resource');
require('angular-animate');
require('angular-filter');
require('angular-loading-bar');

var app = angular.module('timetracker', ['ngRoute', 'ngResource', 'ngAnimate', 'angular-loading-bar', 'angular.filter']);

app.config([
    '$routeProvider', '$locationProvider', '$httpProvider', 'cfpLoadingBarProvider',
    function($routeProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider) {

        $routeProvider
            .when('/', {
                templateUrl: './application/home/views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: './application/login/views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/report', {
                templateUrl: './application/report/views/report.html',
                controller: 'ReportCtrl'
            })
            .when('/profile', {
                templateUrl: './application/profile/views/profile.html',
                controller: 'ProfileCtrl'
            })
            .otherwise({ redirectTo: '/login' })

        //         $locationProvider.html5Mode({
        //   enabled: true,
        //   requireBase: false
        // });
        $httpProvider.interceptors.push('interseptorAuth');
        cfpLoadingBarProvider.includeSpinner = false;
    }
]);


require('./home/controllers/homeCtrl')(app);
require('./login/controllers/loginCtrl')(app);
require('./report/controllers/reportCtrl')(app);
require('./profile/controllers/profileCtrl')(app);

require('./common/factories/taskFactory')(app);
require('./common/factories/interseptorAuthFactory')(app);

require('./common/directives/directives')(app);
require('./common/filters/filters')(app);
require('./common/services/repositorySrv')(app);