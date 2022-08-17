import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AmountTasks} from "../../../interface/amountTasks";
import {Chart, registerables} from "chart.js";
import {
  CHART_BACKGROUND_COLOR,
  CHART_BELOW,
  CHART_BORDER_COLOR,
  CHART_BORDER_WIDTH, CHART_LABEL,
  CHART_TENSION
} from "../../const/graph";
import {getGradient} from "../../const/get-gradient-graph";

@Component({
  selector: 'app-chart-js-line',
  templateUrl: './chart-js-line.component.html',
  styleUrls: ['./chart-js-line.component.scss']
})
export class ChartJsLineComponent implements OnInit {
  @Input() public windowWidth!: number;
  @Input() public statistics!: AmountTasks[];
  @Input() public statusName!: string[];
  @Input() public statusAmount!: number[];

  public elementCanvas: any;

  constructor() {
    Chart.register(...registerables);
  }

  public ngOnInit(): void {
    const myChart = new Chart("chart-line", {
      type: 'line',
      data: {
        labels: this.statusName,
        datasets: [{
          label: CHART_LABEL,
          data: this.statusAmount,
          backgroundColor: CHART_BACKGROUND_COLOR,
          borderColor: CHART_BORDER_COLOR,
          borderWidth: CHART_BORDER_WIDTH,
          fill: {
            target: 'origin',
            // @ts-ignore
            above: this.above,
            below: CHART_BELOW
          },
          tension: CHART_TENSION
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  public above(context: any): void {
    const chart = context.chart;
    const {ctx, chartArea} = chart;
    return getGradient(ctx, chartArea);
  }

  @ViewChild('chart')
  public set pane(v: 'chart') {
    // @ts-ignore
    this.elementCanvas = v.nativeElement;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    if (this.windowWidth < 950) {
      this.elementCanvas.style.width = `${this.windowWidth}px`
      this.elementCanvas.style.height = `${100}%`
    }
  }
}
