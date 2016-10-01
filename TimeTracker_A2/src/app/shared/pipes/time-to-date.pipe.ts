import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeToDate'
})

export class TimeToDatePipe implements PipeTransform {
  transform(time: number = 0): Date {
      var startDate = new Date(1970, 0, 1);
      startDate.setMilliseconds(time);
      return startDate;
  }
}