import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {AmountTasks} from "../../../interface/amountTasks";
import {CHART_BACKGROUND_COLOR, CHART_BORDER_COLOR, CHART_BORDER_WIDTH, CHART_LABEL} from "../../const/graph";

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.scss']
})
export class ChartJsComponent implements OnInit {
  @Input() public windowWidth!: number;
  @Input() public statistics!: AmountTasks[];
  @Input() public statusName!: string[];
  @Input() public statusAmount!: number[];
  private elementCanvas: any;

  constructor() {
    Chart.register(...registerables)
  }

  public ngOnInit(): void {
    const myChart = new Chart("chart", {
      type: 'bar',
      data: {
        labels: this.statusName,
        datasets: [{
          label: CHART_LABEL,
          data: this.statusAmount,
          backgroundColor: CHART_BACKGROUND_COLOR,
          borderColor: CHART_BORDER_COLOR,
          borderWidth: CHART_BORDER_WIDTH
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

  @ViewChild('chart')
  public set pane(v: 'chart') {
    // @ts-ignore
    this.elementCanvas = v.nativeElement;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    if (this.windowWidth < 950){
      this.elementCanvas.style.width = `${this.windowWidth}px`
      this.elementCanvas.style.height = `${100}%`
    }
  }
}
