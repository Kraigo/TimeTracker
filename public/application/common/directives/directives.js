module.exports = function(app) {

    app.directive('inputDate', ['$filter', function($filter) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$formatters.unshift(function(inputValue) {
                    var minutes = Math.floor(inputValue / 1000 / 60) % 60;
                    var hours = Math.floor(inputValue / 1000 / (60 * 60)) % 60;

                    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
                    hours = hours.toString().length === 1 ? '0' + hours : hours;

                    var dateValue = hours + ':' + minutes;
                    return dateValue;
                });

                modelCtrl.$parsers.unshift(function(inputValue) {
                    if (typeof inputValue === 'number') return inputValue;

                    var newValue = 0;
                    var input = inputValue.split(':');
                    var hours = input[0] || 0;
                    var minutes = input[1] || 0;

                    hours = hours > 60 ? 0 : hours;
                    minutes = minutes > 60 ? 0 : minutes;

                    newValue += parseInt(hours) * 60 * 60;
                    newValue += parseInt(minutes) * 60;
                    // modelCtrl.$setViewValue(newValue * 1000);
                    // modelCtrl.$render();
                    return newValue * 1000;
                })

                // element.bind('blur', function() {
                //     scope.$apply();
                //     // modelCtrl.$modelValue = modelCtrl.$modelValue 
                //     // modelCtrl.$render();
                // })
            }
        }
    }])


    app.directive('tasksTable', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './application/home/templates/task.html'
        }
    })

    app.directive('expandFocus', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var elm = element[0];
                elm.setAttribute('rows', 1);

                element.bind('focus', function() {
                    elm.setAttribute('rows', 2);
                })

                element.bind('blur', function() {
                    elm.setAttribute('rows', 1);
                })
            }
        }
    })
}