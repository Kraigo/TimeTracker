module.exports = function(app) {
    app.controller('ReportCtrl', ['$scope', 'Task', 'repository',

        function($scope, Task, repository) {

            $scope.tasks = [];

            repository.getTasks().then(function(response) {
                $scope.tasks = response.data;
                $scope.tasks.map(function(item) {
                    return new Task(item);
                })
            });

        }
    ]);
};