import {DateFormatter} from 'd:/Projects/TimeTracker/node_modules/ng2-bootstrap/components/datepicker/date-formatter';
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
	startWeek: Date;
	currentDay: Day;
	currentTask: Task;

	projects: Project[] = [];
	changeTimer: any;

	constructor(
		private router: Router,
		private repository: RepositoryService
	) { }

	ngOnInit(): void {
		this.viewToday();
		this.getProjects();
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
					day.tasks.push(new Task({date: day.date}))
				})
			});
	}

	addTask(day: Day): void {
		day.tasks.push(new Task({date: day.date}));
	}

	removeTask(task: Task, day: Day): void {
		this.repository.removeTask(task).subscribe( () => {
		    day.tasks.splice(day.tasks.indexOf(task), 1);
		})
		this.currentDay.tasks.splice(this.currentDay.tasks.indexOf(task), 1);
	}

	trackTask(task: Task): void {
		if (task.isTracking) {
			this.currentTask = null; 
			task.stop();           
        } else {
            if (this.currentTask) {
                this.currentTask.stop();
            }
            this.currentTask = task;
            task.start();
        }
		this.updateTask(task);
	}

	taskChanged(task: Task): void {
		clearTimeout(this.changeTimer);
		this.changeTimer = setTimeout(
			() => this.updateTask(task),
			800
		);
	}

	updateTask(task:Task): void {
		this.repository.saveTask(task)
			.subscribe(res => {
				if (res._id) {
					task._id = res._id
				}
			})
	}

	changeWeek(direction: number) {
		var selectedDayIndex: number = this.week.indexOf(this.currentDay);
		this.startWeek = moment(this.currentDay.date).add(direction, 'weeks').isoWeekday('Monday').toDate();
		this.fillWeek();
		this.getTasks();
		this.selectDay(this.week[selectedDayIndex]);
	}

	getProjects(): void {
		this.repository.getProjects()
			.subscribe(projects => this.projects = projects);
	}

	viewToday() {
		let today = moment().startOf('day');
		if (this.startWeek && today.isSame(this.startWeek, 'week')) {
			this.week.forEach(day => {
				if (today.isSame(day.date)) {
					this.selectDay(day);
				}
			})
		} else {
			this.startWeek = moment(this.today).isoWeekday('Monday').toDate();
			this.fillWeek();
			this.getTasks();
		}
	}
}