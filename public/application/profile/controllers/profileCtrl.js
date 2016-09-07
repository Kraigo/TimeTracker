module.exports = function(app) {
    app.controller('ProfileCtrl', ['$scope', 'repository',

        function($scope, repository) {
            $scope.currentUser = null;
            $scope.teams = [];
            $scope.newTeam = null;

            repository.getUser().then(function(response) {
                $scope.currentUser = response.data;

                $scope.currentUser.avatar = $scope.currentUser.avatar.replace(/\?sz=\d*$/, '')

            });


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
                    team.projects = response.data;
                })
            }
        }
    ]);
};