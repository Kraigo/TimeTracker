import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task, Day, Project } from '../shared';
import { RepositoryService } from '../shared';
import * as moment from 'moment';

@Component({
	selector: 'tt-dashboard',
	templateUrl: './dashboard.component.html',
	providers: [RepositoryService]
})

export class DashboardComponent implements OnInit {
	week: Day[] = [];
	today: Date = moment().startOf('day').toDate();
	startWeek: Date = moment(this.today).startOf('week').toDate();
	currentDay: Day;

	projects: Project[] = [];
	changeTimer: NodeJS.Timer;

	constructor(
		private router: Router,
		private repository: RepositoryService
	) { }

	ngOnInit(): void {
		this.fillWeek();
		this.getTasks();
		this.getProjects();

		// new Task({
		// 	_id: 'asd',
		// 	date: new Date(),
		// 	description: 'f',
		// 	isTracking: true,
		// 	lastTrack: null,
		// 	project: 'asd',
		// 	time: 0,
		// 	user: '123'
		// });
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
		this.repository
			.getTasks(this.startWeek)
			.subscribe(tasks => {
				tasks.forEach(task => {

					for (var i = 0, day; i < this.week.length; i++) {
						day = this.week[i];

						var dayDate = moment(day.date).startOf('day');
						var taskDate = moment(task.date).startOf('day');

						if (dayDate.isSame(taskDate)) {
							day.tasks.push(task);
						}
					}

				});

				this.week.forEach(function(day: Day) {
					day.tasks.push(new Task(day.date))
				})
			});
	}

	addTask(day: Day): void {
		day.tasks.push(new Task(day.date));
	}

	removeTask(task: Task, day: Day): void {
		this.repository.removeTask(task).subscribe( () => {
		    day.tasks.splice(day.tasks.indexOf(task), 1);
		})
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
		this.repository.saveTask(task)
			.subscribe(res => {
				if (res._id) {
					task._id = res._id
				}
			})


		// clearTimeout(this.changeTimer);
		// this.changeTimer = setTimeout(function() {
		// }, 800);
	}

	changeWeek(direction: number) {
		var selectedDayIndex: number = this.week.indexOf(this.currentDay);
		this.startWeek = moment(this.currentDay.date).add(direction, 'weeks').startOf('week').toDate();
		this.fillWeek();
		this.getTasks();
		this.selectDay(this.week[selectedDayIndex]);
	}

	getProjects(): void {
		this.repository.getProjects()
			.subscribe(projects => this.projects = projects);
	}
}