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
        let actualDays = this.calculateDaysFromWeeks(timeEstimate);
        let endDate: Date = new Date(dueDate.getTime());
        let startDate: Date = new Date(endDate);
        startDate.setDate(endDate.getDate() - actualDays);
        return startDate;
    }

    calculateDaysFromWeeks(timeEstimate: number): number{
        let numberOfWeeks = this.calculateWeeksFromSeconds(timeEstimate);
        const actualWeekDays = 7;
        let actualDays = numberOfWeeks * actualWeekDays;
        return actualDays;
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

    getTimeEstimate(inputFields: any): any{
        let timeEstimate: any = null;
        if(inputFields['timeestimate'] != null){
            timeEstimate = inputFields['timeestimate'];
        }
        else if(inputFields['timeoriginalestimate'] != null){
            timeEstimate = inputFields['timeoriginalestimate'];
        }
        else if(inputFields['aggregatetimeoriginalestimate'] != null){
            timeEstimate = inputFields['aggregatetimeoriginalestimate'];
        }
        return timeEstimate;
    }

    setColor(label: string): string{
        switch(label){
            case "EVA":
                return "#008FFB";
                break;
            case "Roadmap":
                return "#00E396";
                break;
            case "revenue":
                return "#775DD0";
                break;
            case "Quality":
                return "#FEB019";
                break;
            case "Content-Editing":
                return "#FF4560";
                break;
            case "Frontend":
                return "#008FFB";
                break;
            case "Maintenance":
                return "#00E396";
                break;
            case "Servers":
                return "#775DD0";
                break;
            case "Callcenter":
                return "#FEB019";
                break;
            case "Backend":
                return "#FF4560";
                break;
            case "CAI":
                return "#008FFB";
                break;
            case "Bugs":
                return "#00E396";
                break;
            default:
                return "#775DD0";
                break;
        }
    }
}