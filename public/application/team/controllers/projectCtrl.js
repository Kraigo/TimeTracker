module.exports = function(app) {
    app.controller('ProjectCtrl', ['$scope', 'repository', 'team',

        function($scope, repository, team) {
            $scope.team = team;
            $scope.newProjectTitle = '';

            $scope.addProject = function(team, title) {
                $scope.newProjectTitle = '';

                repository.addProject(team._id, title).then(function(response) {
                    // team.projects.push(response.data);
                    team.projects = response.data;
                })
            }

            $scope.removeProject = function(project, team) {
                repository.removeProject(project._id).then(function(response) {
                    team.projects.splice(team.projects.indexOf(project), 1)
                })
            }

        }
    ]);
};