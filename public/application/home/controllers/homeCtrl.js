module.exports = function(app) {
    app.controller('HomeCtrl', ['$scope', '$timeout', 'Task', 'repository',
        function($scope, $timeout, Task, repository) {

            //TODO Change time for each elements;
            var changeTimer;

            $scope.today = moment().startOf('day').toDate();
            $scope.startWeek = moment($scope.today).startOf('isoweek').toDate();

            $scope.currentDay = null;


            $scope.week = [];
            $scope.projects = [];

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


            $scope.getTasks = function() {
                repository.getTasks($scope.startWeek).then(function(response) {
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
            }


            repository.getTeams().then(function(response) {
                $scope.projects = response.data.reduce(function(projects, team) {
                    return projects.concat(team.projects);
                }, [])
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

                $scope.week.length = [];

                for (var i = 0; i < 7; i++) {
                    var weekDate = moment($scope.startWeek).add(i, 'day').toDate()
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


            $scope.changeWeek = function(direction) {
                var selectedDayIndex = $scope.week.indexOf($scope.currentDay);
                $scope.startWeek = moment($scope.currentDay.date).add(direction, 'weeks').startOf('isoweek').toDate();
                $scope.fillWeek();
                $scope.getTasks();
                $scope.selectDay($scope.week[selectedDayIndex]);
            }

            $scope.getTasks();
            $scope.fillWeek();
        }
    ]);
};