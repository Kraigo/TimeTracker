module.exports = function(app) {
    app.controller('HomeCtrl', ['$scope', 'Task',
        function($scope, Task) {

            var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
            $scope.days = [{
                date: new Date,
                tasks: [new Task(), new Task()]
            }, {
                date: tomorrow,
                tasks: []
            }]

            $scope.hi = 'hello!';

            $scope.addTask = function(day) {
                day.tasks.push(new Task());
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