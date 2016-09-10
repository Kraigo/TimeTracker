module.exports = function(app) {
    app.service('repository', ['$resource', '$http', function($resource, $http) {

        var baseUrl = '/api';
        // var baseUrl = 'http://localhost:3000/api';
        // var User = $resource(baseUrl + '/user');
        // var Task = $resource(baseUrl + '/task');

        return {
            getUser: function() {
                return $http.get(baseUrl + '/user');
            },
            getTasks: function() {
                return $http.get(baseUrl + '/tasks');
            },
            saveTask: function(task) {

                var data = {
                    description: task.description,
                    project: task.project._id,
                    time: task.time,
                    date: task.date,
                    lastTrack: task.lastTrack,
                    isTracking: task.isTracking
                }

                return task._id ? $http.put(baseUrl + '/tasks/' + task._id, data) : $http.post(baseUrl + '/tasks', data);
            },
            removeTask: function(task) {
                return $http.delete(baseUrl + '/tasks/' + task._id);
            },

            // TEAMS //
            getTeams: function() {
                return $http.get(baseUrl + '/teams');
            },
            addTeam: function(title) {
                var data = {
                    title: title
                }
                return $http.post(baseUrl + '/teams', data);
            },

            // PROJECT //
            addProject: function(teamId, title) {
                var data = {
                    team: teamId,
                    title: title
                }

                return $http.post(baseUrl + '/projects', data);
            },
            removeProject: function(project) {
                return $http.delete(baseUrl + '/projects/' + project._id);
            },

            // INVITATION //
            getInvitations: function() {
                return $http.get(baseUrl + '/invitations');
            },

            addInvitation: function(teamId, email) {
                var data = {
                    team: teamId,
                    email: email
                }

                return $http.post(baseUrl + '/invitations', data);
            },
            acceptInvitation: function(invintationId) {
                var data = {
                    id: invintationId
                }

                return $http.put(baseUrl + '/invitations/accept', data);
            }
        }
    }]);
}