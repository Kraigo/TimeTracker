import {Task} from './task.model'

export class Day {
    isToday: boolean = false;
    date: Date;
    tasks: Task[] = [];

    constructor (date: Date = new Date()) {
        this.date = date;
    }

    tasksTime(): number {
        return this.tasks
            .map(task => task.time)
            .reduce(function(sum, item) {
                return sum += parseInt(item.toString());
            }, 0)
    }
}