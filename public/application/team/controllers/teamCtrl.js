module.exports = function(app) {
    app.controller('TeamCtrl', ['$scope', 'repository', 'modal',

        function($scope, repository, modal) {

            $scope.teams = [];
            $scope.invitations = [];
            $scope.newTeam = null;

            repository.getTeams().then(function(response) {
                $scope.teams = response.data;
            })

            repository.getInvitations().then(function(response) {
                $scope.invitations = response.data;
            })

            $scope.addTeam = function() {
                repository.addTeam($scope.newTeam.title).then(function(response) {
                    $scope.teams.push(response.data);
                })
                $scope.newTeam = null;
            }

            $scope.openProjects = function(team) {
                modal.open({
                    templateUrl: "application/team/views/projects.html",
                    controller: 'ProjectCtrl',
                    inputs: {
                        team: team
                    }
                })
            }
            $scope.openMembers = function(team) {
                modal.open({
                    templateUrl: "application/team/views/members.html",
                    controller: 'MemberCtrl',
                    inputs: {
                        team: team
                    }
                })
            }

            $scope.acceptInvitation = function(invitation) {
                repository.acceptInvitation(invitation._id).then(function(response) {
                    $scope.invitations.splice($scope.invitations.indexOf(invitation), 1);
                })
            }
        }
    ]);
};