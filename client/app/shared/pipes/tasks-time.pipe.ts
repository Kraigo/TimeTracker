import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
    name: 'tasksTime',
    pure: false
})

export class TasksTimePipe implements PipeTransform {
  transform(tasks: Task[]): number {
        return tasks.map(function(item) {
            return typeof item.time === 'number' ? item.time : null;
        }).reduce(function(sum, item) {
            return sum += Math.floor(item);
        }, 0);
  }
}