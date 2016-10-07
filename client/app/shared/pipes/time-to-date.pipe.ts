import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeToDate'
})

export class TimeToDatePipe implements PipeTransform {
  transform(ms: number = 0): Date {
      let startDate = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, ms));
      let today = new Date();
      let offset = today.getTimezoneOffset();
      startDate.setMinutes(startDate.getMinutes() + offset);
      return startDate;
  }
}