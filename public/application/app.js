// import angular from 'angular';
// import ngRoute from 'angular-route';
// import ngResource from 'angular-resource';
// import ngAnimate from 'angular-animate';
// import bootstrap from 'bootstrap';
var angular = require('angular');
require('../styles/main.scss');
require('bootstrap/dist/css/bootstrap.css');
require('angular-route');
require('angular-resource');
require('angular-animate');

var app = angular.module('timetracker', ['ngRoute', 'ngResource', 'ngAnimate']);

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

require('./home/controllers/homeCtrl')(app);
require('./common/factories/taskFactory')(app);
require('./common/directives/directives')(app);
require('./common/filters/filters')(app);