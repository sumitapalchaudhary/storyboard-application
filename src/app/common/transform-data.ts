import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { StoryBoardDto } from "../models/story-board.model";
import { ProcessJsonService } from "../services/process-json.service";
import { Utility } from "./utility";

@Injectable()
export class TransformData{
chartDataList: StoryBoardDto[] = [];
listOfLabels: string[] = ['EVA', 'Roadmap', 'revenue', 'Quality', 'Content-Editing', 'Frontend', 'Maintenance', 'Servers', 'Callcenter', 'Backend', 'CAI', 'Bugs'];
    constructor(
        private processJsonService: ProcessJsonService,
        private utility: Utility,
        private datepipe: DatePipe
    ) {}

    transformArraytoStoryBoardData(){
        let issuesArray: [] = this.processJsonService.loadJsonData();
        issuesArray.forEach(issue => {
            let chartData: StoryBoardDto = new StoryBoardDto();
            let fields: any = issue['fields'];
            let issuetype = fields['issuetype'];

            chartData.timeestimate = this.utility.getTimeEstimate(fields);
            if(chartData.timeestimate != null){
                chartData.id = issue['id'];
                chartData.key = issue['key'];
                chartData.issuetypename = issuetype['name'];
                chartData.duedate = this.utility.transformDate(fields['duedate']);
                chartData.startdate = this.utility.calculateStartDate(chartData.duedate, chartData.timeestimate);
                chartData.labels = fields['labels'];
                chartData.summary = fields['summary'];
                chartData.description = issuetype['description'];
                this.chartDataList.push(chartData);
            }
        });
    }

    

    prepareChartDataDictionary(): { [key: string]: StoryBoardDto[] } {
        let chartDataDict: { [key: string]: StoryBoardDto[] } = {};
        this.transformArraytoStoryBoardData();
        this.chartDataList.forEach(cData => {
            cData.labels.forEach(cLabel => {
                if(cLabel in chartDataDict){
                    chartDataDict[cLabel].push(cData);
                }
                else{
                    let storyBoard: StoryBoardDto[] = [];
                    storyBoard.push(cData);
                    chartDataDict[cLabel] = storyBoard;
                }
            });
        });
        return chartDataDict;
    }

    prepareChartData(): any[]{
        let chartDataDict: { [key: string]: StoryBoardDto[] } = this.prepareChartDataDictionary();
        let seriesData: any[] = [];        
        //let labelKeys: string[] = Object.keys(chartDataDict);
        
        for(var label in chartDataDict){
            let storyBoardData: StoryBoardDto[] = chartDataDict[label];
            storyBoardData.forEach(sb => {
                if (label == "Roadmap" || label == "Frontend" || label == "Servers")
                {
                    seriesData.push({
                    'x': label,
                    'y': [
                        sb.startdate.getTime(),
                        sb.duedate.getTime()
                    ],
                    'fillColor': this.utility.setColor(label),
                    'id': sb.id,
                    'key': sb.key,
                    'issuetypename': sb.issuetypename,
                    'labels': this.utility.convertArrayToString(sb.labels),
                    'startdate': this.datepipe.transform(sb.startdate, "dd-MM-yyyy"),
                    'duedate': this.datepipe.transform(sb.duedate, "dd-MM-yyyy"),
                    'timeestimate': this.utility.calculateDaysFromWeeks(sb.timeestimate) + " days",
                    'summary': sb.summary,
                    'description': sb.description
                });
            }
            });
        }
        return seriesData;
    }
}