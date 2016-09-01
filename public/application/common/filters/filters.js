module.exports = function(app) {
    app.filter('tasksTime', function() {
        return function(input) {
            return input.map(function(item) {
                return item.time
            }).reduce(function(sum, item) {
                return sum += item;
            }, 0)
        }
    })
}