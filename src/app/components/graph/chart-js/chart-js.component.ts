import {Component, Input, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {Frequency} from "../../../interface/frequency";

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.scss']
})
export class ChartJsComponent implements OnInit {

  @Input() public statistics!: Frequency[];

  constructor() {
    Chart.register(...registerables)
  }

  public ngOnInit(): void {
    const myChart = new Chart("chart", {
      type: 'bar',
      data: {
        labels: ['To DO', 'In Progress', 'Done'],
        datasets: [{
          label: '# of Votes',
          data: [this.statistics[0].frequency, this.statistics[1].frequency, this.statistics[2].frequency],
          backgroundColor: [
            'rgba(0,255,21, 0.2)',
            'rgba(255,137,0, 0.2)',
            'rgba(255,0,0, 0.2)'
          ],
          borderColor: [
            'rgb(0,255,21)',
            'rgb(255,137,0)',
            'rgb(255,0,0)'
          ],
          borderWidth: 1
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
}
