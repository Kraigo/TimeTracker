import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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

	tasksSubject$ = new Subject<Date>();
	taskUpdateSubject$ = new Subject<Task>();

	constructor(
		private router: Router,
		private repository: RepositoryService
	) {
		this.tasksSubject$
			.debounceTime(400)
			.switchMap(weekDate => this.repository.getTasks(weekDate))
			.subscribe(tasks => this.setTasks.call(this, tasks));

		this.taskUpdateSubject$
			.debounceTime(600)
			.subscribe(task => this.updateTask.call(this, task))
	}

	ngOnInit(): void {
		this.viewToday();
		this.getProjects();
		this.getTasks();	
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
		this.tasksSubject$.next(this.startWeek);
	}

	setTasks(tasks: Task[]): void {
		tasks.forEach(task => {
			for (var i = 0, day; i < this.week.length; i++) {
				day = this.week[i];

				var dayDate = moment(day.date).startOf('day');
				var taskDate = moment(task.date).startOf('day');

				if (dayDate.isSame(taskDate)) {
					day.tasks.push(task);
				}
			}

			if (task.isTracking) {
				this.currentTask = task;
			}

		});

		this.week.forEach(function(day: Day) {
			day.tasks.push(new Task({date: day.date}))
		})
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
			
			this.week.forEach(day => {				
				day.tasks.forEach(_task => {
					if (_task.isTracking && _task._id == task._id) {
						_task.stop();
					}
				});
			});
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
		this.taskUpdateSubject$.next(task);
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
	viewDay(date: Date) {
		this.startWeek = moment(date).isoWeekday('Monday').toDate();
		this.fillWeek();
		this.getTasks();
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
			this.viewDay(this.today);
		}
	}

	weekMode() {
		
	}
}