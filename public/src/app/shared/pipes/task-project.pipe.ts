import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

@Pipe({
    name: 'taskProject'
})

export class TaskProjectPipe implements PipeTransform {
  transform(projects: Project[], task: Task): Project {
      return projects.filter(project => project._id === task.project)[0] || null;
  }
}