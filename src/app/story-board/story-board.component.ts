import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcessJsonService } from '../services/process-json.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill,
  ApexDataLabels,
  ApexYAxis,
  ApexGrid
} from "ng-apexcharts";
import { TransformData } from '../common/transform-data';
import { StoryBoardDialogComponent } from '../story-board-dialog/story-board-dialog.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-story-board',
  templateUrl: './story-board.component.html',
  styleUrls: ['./story-board.component.scss']
})
export class StoryBoardComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  
  constructor(
    private transformData: TransformData,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.constructChart();
  }

  constructChart() {
    this.chartOptions = {
      series: [
        {
          data: this.transformData.prepareChartData()
        }
      ],
      chart: {
        height: 800,
        type: "rangeBar",
        toolbar: {
          show: false
        },
        events: {
          dataPointMouseEnter: function(event: any) {
            event.path[0].style.cursor = "pointer";
          },
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            console.log(config);
            const seriesIndex = config.seriesIndex;
            const dataPointIndex = config.dataPointIndex;
            let strArray = [];
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].id);
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].key);
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].issuetypename);
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].labels);
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].startdate);
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].duedate);
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].timeestimate);
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].summary);
            strArray.push(config.w.config.series[seriesIndex].data[dataPointIndex].description);
            this.openDialog(strArray);
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: any, opts: any) {
          var label = opts.w.config.series[0].data[opts.dataPointIndex].key;
          return label;
        },
        style: {
          colors: ["#f3f4f5", "#fff"]
        }
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        show: true
      },
      grid: {
        row: {
          colors: ["#f3f4f5", "#fff"],
          opacity: 1
        }
      }
    };
  }

  openDialog(data: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      item: data
  };
    const dialogRef = this.dialog.open(StoryBoardDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}


