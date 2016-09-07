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
                'Homing', 'SBC', 'Aya', 'Marine Sync'
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



            repository.getTasks().then(function(response) {
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
                    return;
                });

                $scope.week.forEach(function(day) {
                    day.tasks.push(new Task({ date: day.date }))
                })
            });

            $scope.taskChanged = function(task) {
                $timeout.cancel(changeTimer);
                changeTimer = $timeout(function() {
                    repository.saveTask(task).then(function(response) {
                        if (response.data._id) {
                            task._id = response.data._id;
                        }
                    });
                }, 800);
            }

            $scope.removeTask = function(task, collection, index) {
                repository.removeTask(task).then(function() {
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
                    tasks: []
                });

                for (var i = 0; i < 4; i++) {
                    var weekDate = startWeek.add(1, 'day').toDate()
                    $scope.week.push({
                        date: weekDate,
                        tasks: []
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