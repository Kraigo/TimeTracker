module.exports = function(app) {
    app.controller('HomeCtrl', ['$scope', '$timeout', 'Task', 'repository',
        function($scope, $timeout, Task, repository) {

            var tomorrow = new Date();
            var changeTimer;
            tomorrow.setDate(tomorrow.getDate() + 1);

            $scope.days = [{
                date: new Date,
                tasks: [],
                isToday: true
            }];

            $scope.categories = [
                'Homing', 'SBC'
            ]

            $scope.addTask = function(day) {
                day.tasks.push(new Task({ date: day.date }));
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

                        for (var i = 0, day; i < $scope.days.length; i++) {
                            day = $scope.days[i];;

                            if (moment(day.date).diff(task.date, 'days') === 0) {
                                day.tasks.push(new Task(task));
                                return;
                            }
                        }
                        $scope.days.push({
                            date: task.date,
                            tasks: [new Task(task)]
                        })
                        return;
                    });

                    $scope.days.sort(function(a, b) {
                        return new Date(a.date) - new Date(b.date);
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