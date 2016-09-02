// import angular from 'angular';
// import ngRoute from 'angular-route';
// import ngResource from 'angular-resource';
// import ngAnimate from 'angular-animate';
// import bootstrap from 'bootstrap';
var angular = require('angular');
require('../styles/main.scss');
require('angular-loading-bar/build/loading-bar.min.css');

require('bootstrap/dist/css/bootstrap.css');
require('angular-route');
require('angular-resource');
require('angular-animate');
require('angular-loading-bar');

var app = angular.module('timetracker', ['ngRoute', 'ngResource', 'ngAnimate', 'angular-loading-bar']);

app.config([
    '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: './application/home/views/home.html',
                controller: 'HomeCtrl'
            })

        // $locationProvider.html5Mode(true);
    }
]);

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);

require('./home/controllers/homeCtrl')(app);
require('./common/factories/taskFactory')(app);
require('./common/directives/directives')(app);
require('./common/filters/filters')(app);
require('./common/services/repositorySrv')(app);