module.exports = function(app) {

    app.directive('inputDate', ['$filter', function($filter) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$formatters.unshift(function(inputValue) {
                    var seconds = Math.floor(inputValue / 1000) % 60;
                    var minutes = Math.floor(inputValue / 1000 / 60) % 60;
                    var hours = Math.floor(inputValue / 1000 / (60 * 60)) % 60;

                    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;
                    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
                    hours = hours.toString().length === 1 ? '0' + hours : hours;

                    var dateValue = hours + ':' + minutes + ':' + seconds;
                    return dateValue;
                });

                modelCtrl.$parsers.unshift(function(inputValue) {
                    if (typeof inputValue === 'number') return inputValue;

                    var newValue = 0;
                    var input = inputValue.split(':');

                    newValue += parseInt(input[0]) * 60 * 60;
                    newValue += parseInt(input[1]) * 60;
                    newValue += parseInt(input[2]);

                    // modelCtrl.$setViewValue(newValue);
                    // modelCtrl.$render();
                    return newValue * 1000;
                })
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