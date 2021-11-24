import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcessJsonService } from '../services/process-json.service';
import moment from "moment";

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
    private processJsonService: ProcessJsonService,
    private transformData: TransformData
  ){}

  ngOnInit(): void {
    //this.transformData.prepareChartData();
    this.constructChart();
  }

  constructChart() {
    let labels = this.transformData.prepareChartData().map((d) => d.x);
    console.log(labels);
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
          console.log(opts);
          var label = opts.w.config.series[0].data[opts.dataPointIndex].key;
          console.log(label);
          var a = moment(val[0]);
          var b = moment(val[1]);
          var diff = b.diff(a, "days");
          return label; //+ ": " + diff + (diff > 1 ? " days" : " day");
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
}


