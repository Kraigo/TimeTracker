import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

@Pipe({
    name: 'taskProject'
})

export class TaskProjectPipe implements PipeTransform {
  transform(input: Array<any>, field:string, task: Task): Project {
      return input.filter(item => item._id === task[field])[0] || null;
  }
}