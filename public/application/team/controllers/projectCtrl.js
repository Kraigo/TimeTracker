module.exports = function(app) {
    app.controller('ProjectCtrl', ['$scope', '$uibModalInstance', 'repository', 'team',

        function($scope, $uibModalInstance, repository, team) {
            $scope.team = team;
            $scope.newProjectTitle = '';

            $scope.closeModal = function() {
                $uibModalInstance.dismiss('cancel');
            };

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