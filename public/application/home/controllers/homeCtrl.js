module.exports = function(app) {
    app.controller('HomeCtrl', ['$scope', '$timeout', 'Task', 'repository',
        function($scope, $timeout, Task, repository) {

            var tomorrow = new Date();
            var changeTimer;

            tomorrow.setDate(tomorrow.getDate() + 1);

            $scope.currentDay = new Date();
            $scope.today = new Date();


            $scope.week = [];

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

                        for (var i = 0, day; i < $scope.week.length; i++) {
                            day = $scope.week[i];

                            var dayDate = moment(day.date).startOf('day');
                            var taskDate = moment(task.date).startOf('day');

                            if (dayDate.isSame(taskDate)) {
                                day.tasks.push(new Task(task));
                                return;
                            }
                        }
                        // $scope.week.push({
                        //     date: taskDate.toDate(),
                        //     tasks: [new Task(task)]
                        // })
                        return;
                    });

                    // $scope.week.sort(function(a, b) {
                    //     return new Date(a.date) - new Date(b.date);
                    // })
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

            $scope.selectDay = function(day) {
                $scope.currentDay = day;
            }

            $scope.fillWeek = function() {
                var startWeek = moment().day("Monday").startOf('day');

                $scope.week.push({
                    date: startWeek.toDate(),
                    tasks: [new Task({ date: startWeek.toDate() })]
                });

                for (var i = 0; i < 4; i++) {
                    var weekDate = startWeek.add(1, 'day').toDate()
                    $scope.week.push({
                        date: weekDate,
                        tasks: [new Task({ date: weekDate })]
                    });
                }

                $scope.week.forEach(function(day) {
                    if (moment().startOf('day').isSame(moment(day.date).startOf('day'))) {
                        day.isToday = true;
                        $scope.selectDay(day);
                    }
                })

            };
            $scope.fillWeek();
        }
    ]);
};