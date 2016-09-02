module.exports = function(app) {
    app.controller('HomeCtrl', ['$scope', '$timeout', 'Task', 'repository',
        function($scope, $timeout, Task, repository) {

            var tomorrow = new Date();
            var changeTimer;
            tomorrow.setDate(tomorrow.getDate() + 1);

            $scope.days = [{
                date: new Date,
                tasks: []
            }, {
                date: tomorrow,
                tasks: []
            }];

            $scope.categories = [
                'Homing', 'SBC'
            ]

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
                $timeout.cancel(changeTimer);
                changeTimer = $timeout(function() {
                    repository.saveTask($scope.currentUser, task).then(function(response) {
                        if (response.data._id) {
                            task._id = response.data._id;
                        }
                    });
                }, 800);
            }

            $scope.removeTask = function(task, collection, index) {
                repository.removeTask(task).then(function() {
                    // delete task;
                    collection.splice(index, 1);
                })
            }
        }
    ]);
};