import { Injectable } from "@angular/core";

@Injectable()
export class Utility{
    constructor() {}
    
    transformDate(inputDate: string): Date {
        let dateArray = inputDate.split('-');
        let outputDate: Date = new Date(Number(dateArray[0]),Number(dateArray[1]),Number(dateArray[2]));
        return outputDate;
    }
    
    calculateStartDate(dueDate: Date, timeEstimate: number): Date{
        let numberOfWeeks = this.calculateWeeksFromSeconds(timeEstimate);
        const actualWeekDays = 7;
        let actualDays = numberOfWeeks * actualWeekDays;
        let endDate: Date = new Date(dueDate.getTime());
        let startDate: Date = new Date(endDate);
        startDate.setDate(endDate.getDate() - actualDays);
        return startDate;
    }

    calculateWeeksFromSeconds(timeEstimate: number): number{
        let totalHours = Math.floor(timeEstimate/3600);
        const hoursPerDay = 8;
        let workDays = Math.floor(totalHours/hoursPerDay);
        const workDaysPerWeek = 5;
        let dayToWeeks = Math.floor(workDays/workDaysPerWeek)
        return dayToWeeks;
    }

    convertArrayToString(stringArray: string[]): string{
        let strValue: string = "";
        stringArray.forEach(sa => {
            if(stringArray[stringArray.length - 1] == sa){
                strValue += sa;
            }
            else{
                strValue += sa + ', ';
            }
        });
        return strValue;
    }
}