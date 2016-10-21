import { Task } from './task.model';
import * as moment from 'moment';

export class Week {
    tasks: Task[] = [];
    dateEnd: Date;
    number: number;

    constructor(
        public date: Date
    ) {
        var weekMoment = moment(this.date).isoWeekday('Monday');
        this.date = weekMoment.toDate();
        this.number = weekMoment.week();
        this.dateEnd = weekMoment.add(6, 'days').toDate();
    }
}