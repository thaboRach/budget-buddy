import { Component, viewChild, input, computed } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexLegend,
  ApexTooltip,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexGrid,
  ApexAnnotations,
  ApexStates,
  ApexTheme,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  fill?: ApexFill;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  markers?: ApexMarkers;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  grid?: ApexGrid;
  annotations?: ApexAnnotations;
  states?: ApexStates;
  theme?: ApexTheme;
  colors?: string[];
  labels?: any;
};

@Component({
  imports: [NgApexchartsModule],
  selector: 'app-donut-chart',
  styleUrl: './donut-chart.scss',
  templateUrl: './donut-chart.html',
})
export class DonutChart {
  public labels = input.required<string[]>();
  public data = input.required<ApexNonAxisChartSeries>();

  public chartOptions = computed<Partial<ChartOptions>>(() => ({
    series: this.data(),
    chart: {
      type: 'donut',
      width: 500,
    },
    labels: this.labels(),
    colors: ['#0EA5E9', '#14B8A6', '#F59E0B', '#F43F5E'],
    plotOptions: {
      pie: {
        borderRadius: 12,
        spacing: 5,
        donut: {
          size: '68%',
          labels: {
            show: true,
            value: {
              show: true,
              fontFamily: 'Mona-Sans, sans-serif',
              fontSize: '20px',
              color: '#d9e1fa',
            },
            total: {
              show: true,
              fontFamily: 'Mona-Sans, sans-serif',
              fontSize: '26px',
              color: '#ffffff',
              fontWeight: 'medium',
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Mona-Sans, sans-serif',
      fontSize: '14px',
      labels: {
        colors: '#aeb9e1',
      },
    },
    title: {
      text: 'Spending by Category',
      align: 'left',
      style: {
        color: '#aeb9e1',
        fontSize: '14px',
        fontWeight: 'medium',
        fontFamily: 'Mona-Sans, sans-serif',
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
        },
      },
    ],
  }));
}
