module.exports = function(app) {
    app.controller('LoginCtrl', ['$scope',

        function($scope) {

            $scope.user = {
                name: '',
                password: ''
            }
        }
    ]);
};