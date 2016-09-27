import {Task} from './task.model'

export class Day {
    isToday: boolean = false;
    date: Date;
    tasks: Task[] = [];
    constructor (date: Date) {
        this.date = date;
    }
}