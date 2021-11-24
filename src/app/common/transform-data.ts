import { Injectable } from "@angular/core";
import { Data } from "@angular/router";
import { ChartDto, StoryBoardDto } from "../models/story-board.model";
import { ProcessJsonService } from "../services/process-json.service";
import { Utility } from "./utility";

@Injectable()
export class TransformData{
chartDataList: StoryBoardDto[] = [];
    constructor(
        private processJsonService: ProcessJsonService,
        private utility: Utility
    ) {}

    transformArraytoStoryBoardData(){
        let issuesArray: [] = this.processJsonService.loadJsonData();
        issuesArray.forEach(issue => {
            let chartData: StoryBoardDto = new StoryBoardDto();
            let fields: any = issue['fields'];
            let issuetype = fields['issuetype'];

            chartData.timeestimate = this.getTimeEstimate(fields);
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

    prepareChartDataDictionary(): any {
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
        let chartDataArray: ChartDto[] = [];
        let seriesData: any[] = [];        
        //let labelKeys: string[] = Object.keys(chartDataDict);
        
        for(var label in chartDataDict){
            let storyBoardData: StoryBoardDto[] = chartDataDict[label];
            storyBoardData.forEach(sb => {
                let chartData: ChartDto = new ChartDto();
                let dateArray: Date[] = [sb.startdate, sb.duedate];
                chartData.x = label;
                chartData.y = dateArray;
                chartData.fillColor = this.setColor(label);
                chartDataArray.push(chartData);
                if (label == "Roadmap" || label == "EVA")
                {
                    seriesData.push({
                    'x': chartData.x,
                    'y': [
                        sb.startdate.getTime(),
                        sb.duedate.getTime()
                    ],
                    'fillColor': chartData.fillColor,
                    'summary': sb.summary,
                    'key': sb.key
                })
            }
            });
        }
        console.log(seriesData);
        return seriesData;
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