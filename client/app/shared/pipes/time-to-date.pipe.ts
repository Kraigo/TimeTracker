import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeToDate'
})

export class TimeToDatePipe implements PipeTransform {
  transform(ms: number = 0): string {
      
      let minutes: number = Math.floor(ms / 1000 / 60) % 60;
      let hours: number = Math.floor(ms / 1000 / 60 / 60) % 60;
      let mm:string = minutes.toString().length === 1 ? '0' + minutes.toString() : minutes.toString();
      let hh:string = hours.toString().length === 1 ? '0' + hours.toString() : hours.toString();

      return `${hh}:${mm}`;
  }
}