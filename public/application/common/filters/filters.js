module.exports = function(app) {
    app.filter('tasksTime', function() {
        return function(input) {
            return input.map(function(item) {
                return parseInt(item.time)
            }).reduce(function(sum, item) {
                return sum += item;
            }, 0)
        }
    });

    app.filter('toLocalDate', function() {
        return function(input, field) {
            return input.map(function(a) {
                var target = new Date(field ? a[field] : a);
                a.localDate = target.toLocaleDateString();
                return a;
            })
        }
    });

    app.filter('secondsToDateTime', [function() {
        return function(seconds) {
            return new Date(1970, 0, 1).setMilliseconds(seconds);
        };
    }]);
}