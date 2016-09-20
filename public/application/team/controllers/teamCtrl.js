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
            $scope.removeTeam = function(team) {
                modal.confirmation('Are you want to remove team ' + team.title + '?').then(function(confirm) {
                    repository.removeTeam(team._id).then(function(response) {
                        $scope.teams.splice($scope.teams.indexOf(team), 1);
                    })
                })
            }

            $scope.openProjects = function(team) {
                modal.open({
                    templateUrl: "application/team/views/projects.html",
                    controller: 'ProjectCtrl',
                    resolve: {
                        team: team
                    }
                })
            }
            $scope.openMembers = function(team) {
                modal.open({
                    templateUrl: "application/team/views/members.html",
                    controller: 'MemberCtrl',
                    resolve: {
                        team: team
                    }
                })
            }

            $scope.acceptInvitation = function(invitation) {
                repository.acceptInvitation(invitation._id).then(function(response) {
                    $scope.invitations.splice($scope.invitations.indexOf(invitation), 1);
                    $scope.teams.push(response.data);
                })
            }
        }
    ]);
};