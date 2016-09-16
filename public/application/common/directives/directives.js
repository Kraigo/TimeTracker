module.exports = function(app) {

    app.directive('inputDate', ['$timeout', function($timeout) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, modelCtrl) {

                modelCtrl.$parsers.unshift(function(inputValue) {
                    if (typeof inputValue === 'number') return inputValue;

                    var newValue = 0;
                    var hours = 0;
                    var minutes = 0;

                    var splitByDot = inputValue.split('.');
                    var splitByColon = inputValue.split(':');
                    var splitBySpace = inputValue.split(' ');

                    if (splitByDot.length > 1) {
                        hours = splitByDot[0] || 0;
                        minutes = splitByDot[1] || 0;
                        minutes = parseInt(60 * parseFloat('0.' + minutes));
                    } else if (splitByColon.length > 1) {
                        hours = splitByColon[0] || 0;
                        minutes = splitByColon[1] || 0;
                    } else if (splitBySpace.length > 1) {
                        hours = splitBySpace[0] || 0;
                        minutes = splitBySpace[1] || 0;
                    } else {
                        hours = inputValue;
                        minutes = 0;
                    }

                    hours = hours > 60 ? 0 : hours;
                    if (minutes.length === 1) {
                        minutes += '0';
                    }
                    minutes = minutes > 60 ? 0 : minutes;

                    newValue += parseInt(hours) * 60 * 60;
                    newValue += parseInt(minutes) * 60;

                    var input = inputValue.split(':');
                    return newValue * 1000;
                });

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
                        var formattedValue = modelCtrl.$formatters.reduce(function(value, formatter) {
                            return formatter(value)
                        }, modelCtrl.$modelValue)

                        modelCtrl.$setViewValue(formattedValue);
                        modelCtrl.$render();
                    })

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

    app.directive('tasksFooter', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './application/home/views/footer.html'
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