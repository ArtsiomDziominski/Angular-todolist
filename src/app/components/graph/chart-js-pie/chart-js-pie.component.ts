import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AmountTasks} from "../../../interface/amountTasks";
import {Chart, registerables} from "chart.js";
import {CHART_BACKGROUND_COLOR, CHART_BORDER_COLOR, CHART_BORDER_WIDTH, CHART_LABEL} from "../../const/graph";

@Component({
  selector: 'app-chart-js-pie',
  templateUrl: './chart-js-pie.component.html',
  styleUrls: ['./chart-js-pie.component.scss']
})
export class ChartJsPieComponent implements OnInit {
  @Input() public windowWidth!: number;
  @Input() public statistics!: AmountTasks[];
  @Input() public statusName!: string[];
  @Input() public statusAmount!: number[];

  constructor() {
    Chart.register(...registerables);
  }

  public ngOnInit(): void {
    const myChart = new Chart("chart-pie", {
      type: 'pie',
      data: {
        labels: this.statusName,
        datasets: [{
          label: CHART_LABEL,
          data: this.statusAmount,
          backgroundColor: CHART_BACKGROUND_COLOR,
          borderColor: CHART_BORDER_COLOR,
          borderWidth: CHART_BORDER_WIDTH
        }]
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    let width:any = document.getElementsByClassName( 'chart' );
    if (this.windowWidth < 1000) {
      width[2].style.width = `${this.windowWidth}px`
      width[2].style.height = `${100}%`
    }
  }
}
