import { Pipe, PipeTransform } from '@angular/core';
import { Task, Week } from '../shared';
import * as moment from 'moment';

@Pipe({name: 'groupTasksByWeek'})

export class GroupTasksByWeekPipe implements PipeTransform {
  transform(tasks: Task[]): Array<Week> {
    return tasks
        .sort( (a,b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        })
        .reduce((weeks, task) => {
            let weekDate = moment(task.date).isoWeekday('Monday').startOf('day').toDate();
            for (let week of weeks) {
                if (week.date.getTime() == weekDate.getTime()) {
                    week.tasks.unshift(task);
                    return weeks;
                }
            }

            let week = new Week(weekDate);   
            week.tasks.push(task);

            weeks.push(week);
            return weeks;

        }, [])
  }
}