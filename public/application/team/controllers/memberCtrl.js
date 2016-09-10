module.exports = function(app) {
    app.controller('MemberCtrl', ['$scope', 'repository', 'team',

        function($scope, repository, team) {
            $scope.team = team;

            $scope.addMember = function(team, email) {

                repository.addInvitation(team._id, email).then(function(response) {

                })

                // repository.addProject(team._id, title).then(function(response) {
                //     // team.projects = response.data;
                // })
            }

            $scope.removeMember = function(project, team) {
                // repository.removeProject(project).then(function(response) {
                //     team.projects.splice(team.projects.indexOf(project), 1)
                // })
            }

        }
    ]);
};