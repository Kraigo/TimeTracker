module.exports = function(app) {
    app.controller('HomeCtrl', ['$scope', '$timeout', 'Task', 'repository',
        function($scope, $timeout, Task, repository) {

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            $scope.days = [{
                date: new Date,
                tasks: [new Task(), new Task()]
            }, {
                date: tomorrow,
                tasks: []
            }]

            $scope.addTask = function(day) {
                day.tasks.push(new Task());
            }

            $scope.trackTask = function(task) {
                if (task.isTracking) {
                    task.stop();
                } else {
                    task.start();
                }
                $scope.taskChanged(task);
            }

            repository.getUser().then(function(response) {
                $scope.currentUser = response.data;

                repository.getTasks($scope.currentUser).then(function(response) {
                    response.data.forEach(function(task) {
                        $scope.days[0].tasks.push(new Task(task));
                    })
                });
            })

            $scope.taskChanged = function(task) {
                repository.saveTask($scope.currentUser, task).then(function(response) {
                    console.log('task saved!');
                });
            }
        }
    ]);
};