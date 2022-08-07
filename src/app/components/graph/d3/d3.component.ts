import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {getFromLocalStorage} from "../../../get-from-local-storage";
import {STORAGE_ALL_TASKS_KEY} from "../../const";
import {ITask} from "../../../interface/tasks";
import {Frequency} from "../../../interface/frequency";

@Component({
  selector: 'app-d3',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit, AfterViewInit {
  public amountTaskToDo: number = 0;
  public amountTaskInProgress: number = 0;
  public amountTaskDone: number = 0;
  public allTasks: ITask[] = [];

  public statistics: Frequency[] = [];

  private width!: number;
  private height!: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  public saveAmountTasks(name: string, amount: number): void {
    this.statistics.push({letter: name, frequency: amount});
  }

  public ngOnInit(): void {
    let toDo:string = 'To Do';
    let InProgress:string = 'In Progress';
    let Done:string = 'Done';

    let allTasks: string | null = getFromLocalStorage(STORAGE_ALL_TASKS_KEY);
    this.allTasks = JSON.parse(<string>allTasks);
    this.allTasks.forEach((count) => {
      if (count.status === 'todo') {
        this.amountTaskToDo++;
      } else if (count.status === 'inProgress') {
        this.amountTaskInProgress++;
      } else if (count.status === 'done') {
        this.amountTaskDone++;
      }
    })
    this.saveAmountTasks(toDo, this.amountTaskToDo);
    this.saveAmountTasks(InProgress, this.amountTaskInProgress);
    this.saveAmountTasks(Done, this.amountTaskDone);
  }

  public ngAfterViewInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  private initSvg() {
    this.svg = d3.select('#bar-d3');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  private initAxis() {
    this.x = d3Scale
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.statistics.map(d => d.letter));
    this.y.domain([0, d3Array.max(this.statistics, d => d.frequency)]);
  }

  private drawAxis() {
    this.g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(10, ''))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -200)
      .attr('dy', '0.71em')
      .text('Amount');
  }

  private drawBars() {
    this.g
      .selectAll('.bar')
      .data(this.statistics)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.x(d.letter))
      .attr('y', (d: any) => this.y(d.frequency))
      .attr('width', this.x.bandwidth())
      .attr('height', (d: any) => this.height - this.y(d.frequency));
  }
}
