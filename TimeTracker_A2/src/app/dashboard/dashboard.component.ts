import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task, Day, Project } from '../shared';
import * as moment from 'moment';

@Component({
	selector: 'tt-dashboard',
	templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
	week: Day[] = [];
	today: Date = moment().startOf('day').toDate();
	startWeek: Date = moment(this.today).startOf('isoWeek').toDate();
	currentDay: Day;

	projects: Project[] = [];

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
		this.fillWeek();
		this.getTasks();
		this.projects.push({_id: '1', title: 'Project 1'});
		this.projects.push({_id: '2', title: 'Project 2'});
	}

	selectDay(day: Day): void {
		this.currentDay = day;
	}

	fillWeek(): void {
		var self = this;

		this.week.length = 0;

		for (var i = 0; i < 7; i++) {
			var weekDate: Date = moment(this.startWeek).add(i, 'day').toDate()
			this.week.push(new Day(weekDate));
		}

		this.week.forEach(function (day: Day) {
			if (moment().startOf('day').isSame(moment(day.date).startOf('day'))) {
				day.isToday = true;
				self.selectDay(day);
			}
		})

	}

	getTasks(): void {
		// repository.getTasks($scope.startWeek).then(function(response) {
		//     response.data.forEach(function(task) {

		//         for (var i = 0, day; i < $scope.week.length; i++) {
		//             day = $scope.week[i];

		//             var dayDate = moment(day.date).startOf('day');
		//             var taskDate = moment(task.date).startOf('day');

		//             if (dayDate.isSame(taskDate)) {
		//                 day.tasks.push(new Task(task));
		//                 return;
		//             }
		//         }
		//         return;
		//     });

		    this.week.forEach(function(day) {
		        day.tasks.push(new Task())
		    })
		// });
	}

	addTask(day: Day): void {
		day.tasks.push(new Task());
	}

	removeTask(task: Task): void {
		// repository.removeTask(task).then(function() {
		//     collection.splice(index, 1);
		// })
		this.currentDay.tasks.splice(this.currentDay.tasks.indexOf(task), 1);
	}

	trackTask(task: Task): void {
		if (task.isTracking) {
			task.stop();
		} else {
			task.start();
		}
		this.taskChanged(task);
	}

	taskChanged(task: Task): void {
		// $timeout.cancel(changeTimer);
		// changeTimer = $timeout(function() {
		//     repository.saveTask(task).then(function(response) {
		//         if (response.data._id) {
		//             task._id = response.data._id;
		//         }
		//     });
		// }, 800);
	}

	changeWeek(direction: number) {
		var selectedDayIndex: number = this.week.indexOf(this.currentDay);
		this.startWeek = moment(this.currentDay.date).add(direction, 'weeks').startOf('isoWeek').toDate();
		this.fillWeek();
		this.getTasks();
		this.selectDay(this.week[selectedDayIndex]);
	}
}