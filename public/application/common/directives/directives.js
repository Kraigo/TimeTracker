module.exports = function(app) {

    app.directive('inputDate', ['$timeout', function($timeout) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.unshift(function(inputValue) {
                    if (typeof inputValue === 'number') return inputValue;

                    var newValue = 0;
                    var hours = 0;
                    var minutes = 0;

                    var matchByColon = inputValue.split(':');
                    var matchByDot = inputValue.split('.');
                    var matchBySpace = inputValue.split(' ');

                    if (matchByColon.length > 1) {
                        hours = matchByColon[0] || 0;
                        minutes = matchByColon[1] || 0;
                    } else if (matchByDot.length > 1) {
                        hours = matchByDot[0] || 0;
                        minutes = matchByDot[1] || 0;
                        minutes = parseInt(60 * parseFloat('0.' + minutes));
                    } else if (matchBySpace.length > 1) {
                        hours = matchBySpace[0] || 0;
                        minutes = matchBySpace[1] || 0;
                    } else {
                        hours = parseInt(inputValue);
                    }
                    if (minutes.length === 1) {
                        minutes = minutes + '0';
                    }
                    hours = hours > 60 ? 0 : hours;
                    minutes = minutes > 60 ? 0 : minutes;

                    newValue += parseInt(hours) * 60 * 60;
                    newValue += parseInt(minutes) * 60;
                    // modelCtrl.$setViewValue(newValue * 1000);
                    // modelCtrl.$render();
                    return newValue * 1000;
                })

                modelCtrl.$formatters.unshift(function(inputValue) {
                    var minutes = Math.floor(inputValue / 1000 / 60) % 60;
                    var hours = Math.floor(inputValue / 1000 / (60 * 60)) % 60;

                    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
                    hours = hours.toString().length === 1 ? '0' + hours : hours;

                    var dateValue = hours + ':' + minutes;
                    return dateValue;
                });

                element.bind('blur', function() {
                    $timeout(function() {
                        var formattedValue = modelCtrl.$formatters.reduce(function(result, formatter) {
                            return formatter(result);
                        }, modelCtrl.$modelValue)
                        modelCtrl.$setViewValue(formattedValue);
                        modelCtrl.$render();
                    });
                })
            }
        }
    }])


    app.directive('tasksTable', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './application/home/views/task.html'
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