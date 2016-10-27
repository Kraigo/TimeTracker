import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';

@Pipe({
    name: 'taskCategory'
})

export class TaskCategoryPipe implements PipeTransform {
  transform(projects: Category[], task: Task): Category {
      return projects.filter(category => category._id === task.category)[0] || null;
  }
}