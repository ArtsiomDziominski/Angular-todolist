import {AfterViewInit, Component, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {Frequency} from "../../../interface/frequency";

@Component({
  selector: 'app-d3',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements AfterViewInit {

  private width!: number;
  private height!: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  @Input() public statistics!: Frequency[];

  public ngAfterViewInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  private initSvg(): void {
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

  private initAxis(): void {
    this.x = d3Scale
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.statistics.map(d => d.letter));
    this.y.domain([0, d3Array.max(this.statistics, d => d.frequency)]);
  }

  private drawAxis(): void {
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
      .text('Amount, pcs');
  }

  private drawBars(): void {
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
