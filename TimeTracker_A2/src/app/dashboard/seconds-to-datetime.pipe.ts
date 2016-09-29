import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secondsToDatetime'
})

export class SecondsToDatetimePipe implements PipeTransform {
  transform(seconds: number = 0): Date {
      var startDate = new Date(1970, 0, 1);
      startDate.setMilliseconds(seconds);
      return startDate;
  }
}