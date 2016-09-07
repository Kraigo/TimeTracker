module.exports = function(app) {
    app.controller('ProfileCtrl', ['$scope', 'repository',

        function($scope, repository) {
            $scope.currentUser = null;

            repository.getUser().then(function(response) {
                $scope.currentUser = response.data;

                $scope.currentUser.avatar = $scope.currentUser.avatar.replace(/\?sz=\d*$/, '')

            });
        }
    ]);
};