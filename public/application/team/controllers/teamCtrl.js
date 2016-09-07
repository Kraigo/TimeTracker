module.exports = function(app) {
    app.controller('TeamCtrl', ['$scope', 'repository',

        function($scope, repository) {
          
            $scope.teams = [];
            $scope.newTeam = null;

            repository.getTeams().then(function(response) {
                $scope.teams = response.data;
            })

            $scope.addTeam = function() {
                repository.addTeam($scope.newTeam.title).then(function(response) {
                    $scope.teams.push(response.data);
                })
                $scope.newTeam = null;
            }

            $scope.addProject = function(team, title) {
                repository.addProject(team._id, title).then(function(response) {
                    // team.projects = response.data;
                })
            }

            $scope.removeProject = function(project, team) {
                repository.removeProject(project).then(function(response) {
                    team.projects.splice(team.projects.indexOf(project), 1)
                })
            }
        }
    ]);
};