module.exports = function(app) {
    app.controller('HomeCtrl', ['$scope', 'Task',
        function($scope, Task) {

            $scope.hi = 'hello!';
            $scope.tasks = [];
            $scope.addTask = function() {
                $scope.tasks.push(new Task());
            }

            $scope.trackTask = function(task) {
                if (task.isTracking) {
                    task.stop();
                } else {
                    task.start();
                }
            }
        }
    ]);
};