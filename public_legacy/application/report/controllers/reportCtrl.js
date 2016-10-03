module.exports = function(app) {
    app.controller('ReportCtrl', ['$scope', 'Task', 'repository',

        function($scope, Task, repository) {

            $scope.tasks = [];
            $scope.projects = [];

            repository.getTasks().then(function(response) {
                $scope.tasks = response.data;
                $scope.tasks.map(function(item) {
                    return new Task(item);
                })
            });

            repository.getProjects().then(function(response) {
                $scope.projects = response.data;
            });

        }
    ]);
};