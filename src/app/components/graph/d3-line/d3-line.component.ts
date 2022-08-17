import {Component, AfterViewInit, ViewEncapsulation, Input} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {AmountTasks} from "../../../interface/amountTasks";
import {AMOUNT_PCS, COLOR_LINE_OFFSET_100, COLOR_LINE_OFFSET_0} from "../../const/graph";

@Component({
  selector: 'app-d3-line',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './d3-line.component.html',
  styleUrls: ['./d3-line.component.scss']
})
export class D3LineComponent implements AfterViewInit {
  @Input() public statistics!: AmountTasks[];

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number = 900;
  private height: number = 500;
  private x: any;
  private y: any;
  private svg: any;
  private line?: d3Shape.Line<[number, number]>;

  constructor() {
    this.width = this.width - this.margin.left - this.margin.right;
    this.height = this.height - this.margin.top - this.margin.bottom;
  }

  public ngAfterViewInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
    this.drawArea()
    this.info();
    this.circle()

  }

  private initSvg(): void {
    this.svg = d3.select('#d3-line')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis(): void {
    this.x = d3Scale.scalePoint()
      .rangeRound([0, this.width]);

    this.y = d3Scale.scaleLinear()
      .rangeRound([this.height, 0]);

    this.x.domain(this.statistics.map(d => d.name));
    this.y.domain([0, d3Array.max(this.statistics, d => d.amount * 1.2)]);
  }

  private drawAxis(): void {
    this.svg.append('g')
      .attr('class', 'axis-line axis--x-line')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y-line')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title-line')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text(AMOUNT_PCS);
  }

  private drawLine(): void {
    this.line = d3Shape.line()
      .curve(d3Shape.curveBumpX)
      .x((d: any) => this.x(d.name))
      .y((d: any) => this.y(d.amount));

    this.svg
      .append('path')
      .datum(this.statistics)
      .attr('class', 'line')
      .attr('d', this.line);
  }

  public drawArea(): void {
    this.svg
      .append("path")
      .datum(this.statistics)
      .attr('class', 'area-line')
      .attr("d", d3Shape.area()
        .curve(d3Shape.curveBumpX)
        .x((d: any) => this.x(d.name))
        .y0(this.height)
        .y1((d: any) => this.y(d.amount))
      );

    this.svg.append("linearGradient")
      .attr("id", "linear-gradient")
      .attr("x2", 0).attr("y2", 1)
      .selectAll("stop")
      .data([
        {offset: "0%", color: COLOR_LINE_OFFSET_0},
        {offset: "80%", color: COLOR_LINE_OFFSET_100}
      ])
      .enter().append("stop")
      .attr("offset", (d: any) => d.offset)
      .attr("stop-color", (d: any) => d.color);
  }

  public circle(): void {
    let mouseover = (d: any) => {
      let x: number = Number(d.target.cx.animVal.valueAsString) + 10;
      const y: number = Number(d.target.cy.animVal.valueAsString) - 20;
      const xShowRight: number = 700;

      if (x > xShowRight) {
        x = x - 90
      }

      this.svg
        .select('.text')
        .attr("x", String(x))
        .attr("y", String(y))
        .style("opacity", 1);
    }

    let mousemove = (d: any) => {
      const amountTasks: number = d.target.__data__.amount;
      const statusTasks: number = d.target.__data__.name;

      this.svg
        .select('.text')
        .html(statusTasks + '.   ' + 'Tasks: ' + amountTasks);
    }

    let mouseleave = () => {
      this.svg
        .selectAll('.text')
        .style("opacity", 0);
    }

    this.svg
      .append("g")
      .selectAll("dot")
      .data(this.statistics)
      .enter()
      .append("circle")
      .attr('class', 'circle')
      .attr("cx", (d: any) => this.x(d.name))
      .attr("cy", (d: any) => this.y(d.amount))
      .attr("r", 6)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  }

  public info(): void {
    this.svg
      .selectAll('.circle')
      .data(this.statistics)
      .enter()
      .append('text')
      .attr('class', 'text')
      .style("opacity", 0)
      .attr('dy', '0.71em');
  }
}
