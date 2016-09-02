module.exports = function(app) {
    app.service('repository', ['$resource', '$http', function($resource, $http) {

        var baseUrl = 'http://localhost:3000';
        // var User = $resource(baseUrl + '/user');
        // var Task = $resource(baseUrl + '/task');

        return {
            getUser: function() {
                return $http.get(baseUrl + '/user');
            },
            getTasks: function(user) {
                return $http.get(baseUrl + '/tasks/' + user._id);
            },
            saveTask: function(user, task) {

                var data = {
                    user: user._id,
                    description: task.description,
                    time: task.time,
                    date: task.date
                }
                return $http.post(baseUrl + '/tasks', data);
            }
        }
    }]);
}