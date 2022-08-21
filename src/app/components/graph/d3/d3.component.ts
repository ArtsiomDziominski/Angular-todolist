import {AfterViewInit, Component, Input, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {AmountTasks} from "../../../interface/amountTasks";
import {AMOUNT_PCS} from "../../const/graph";

@Component({
  selector: 'app-d3',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements AfterViewInit {

  private width: number = 900;
  private height: number = 500;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  @Input() public statistics!: AmountTasks[];

  public ngAfterViewInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  private initSvg(): void {
    this.width = this.width - this.margin.left - this.margin.right;
    this.height = this.height - this.margin.top - this.margin.bottom;

    this.svg = d3.select('#d3-bar')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');

    this.g = this.svg
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis(): void {
    this.x = d3Scale
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1);

    this.y = d3Scale.scaleLinear()
      .rangeRound([this.height, 0]);

    this.x.domain(this.statistics.map(d => d.name));
    this.y.domain([0, d3Array.max(this.statistics, d => d.amount * 1.2)]);
  }

  private drawAxis(): void {
    this.g
      .append('g')
      .attr('class', 'axis-bar axis--x-bar')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.g
      .append('g')
      .attr('class', 'axis-bar axis--y-bar')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title-bar')
      .attr('transform', 'rotate(-90)')
      .attr('dy', '0.71em')
      .attr('y', '-40')
      .attr('x', '-200')
      .text(AMOUNT_PCS);
  }

  private drawBars(): void {
    this.g
      .selectAll('.bar')
      .data(this.statistics)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.x(d.name))
      .attr('y', (d: any) => this.y(d.amount))
      .attr('width', this.x.bandwidth())
      .attr('height', (d: any) => this.height - this.y(d.amount));
  }
}
