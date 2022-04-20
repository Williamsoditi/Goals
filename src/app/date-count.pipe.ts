import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCount'
})
export class DateCountPipe implements PipeTransform {

  transform(value: any): number {
    let today:Date = new Date(); //get current date & time
    let todayWithNoTime:any = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var dateDifference = Math.abs(value - todayWithNoTime) // returns value in milliseconds
    const secondsInDay = 86400; //60 sec in an Hr * 24 hrs a day
    var dateDifferenceSeconds = dateDifference*0.001; //converts miliseconds to seconds
    var dateCounter = dateDifferenceSeconds/secondsInDay;

    if (dateCounter >=1 && value > todayWithNoTime) {
      return dateCounter;
    } else {
      return 0;
    }
  }
}
