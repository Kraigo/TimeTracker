module.exports = function(app) {
    app.controller('ReportCtrl', ['$scope', 'Task', 'repository',

        function($scope, Task, repository) {

            $scope.user = {
                name: '',
                password: ''
            }
            $scope.tasks = [];
            repository.getUser().then(function(response) {
                $scope.currentUser = response.data;

                repository.getTasks($scope.currentUser).then(function(response) {
                    $scope.tasks = response.data;
                    $scope.tasks.map(function(item){
                        return new Task(item);
                    })
                });
            })
        }
    ]);
};