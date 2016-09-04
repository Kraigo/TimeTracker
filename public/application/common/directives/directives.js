module.exports = function(app) {
    // app.directive('inputDate', ['$filter', function($filter) {
    //     return {
    //         require: 'ngModel',
    //         link: function(scope, element, attrs, modelCtrl) {
    //             modelCtrl.$formatters.unshift(function(inputValue) {
    //                 var dateValue = $filter('date')(inputValue, 'hh:mm:ss', 'UTC')[0];

    //                 modelCtrl.$setViewValue(dateValue);
    //                 modelCtrl.$render();
    //                 return dateValue;
    //             });
    //         }
    //     }
    // }])


    app.directive('tasksTable', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './application/home/templates/task.html'
        }
    })

    app.filter('secondsToDateTime', [function() {
        return function(seconds) {
            return new Date(1970, 0, 1).setSeconds(seconds);
        };
    }])
}