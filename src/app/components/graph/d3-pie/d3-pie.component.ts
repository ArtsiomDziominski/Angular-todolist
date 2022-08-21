import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {AmountTasks} from "../../../interface/amountTasks";
import {COLOR_PIECE_PIE, COLOR_PIECE_PIE_STROKE} from "../../const/graph";

@Component({
  selector: 'app-d3-pie',
  templateUrl: './d3-pie.component.html',
  styleUrls: ['./d3-pie.component.scss']
})

export class D3PieComponent implements OnInit {
  private svg: any;
  private margin: number = 50;
  private width: number = 750;
  private height: number = 600;
  private radius: number = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  @Input() public statistics!: AmountTasks[];

  public ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select("svg#d3-pie")
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 750 600')
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.statistics.map((d: any) => d.amount.toString()))
      .range(COLOR_PIECE_PIE);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.amount));

    this.svg
      .selectAll('pieces')
      .data(pie(this.statistics))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", COLOR_PIECE_PIE_STROKE)
      .style("stroke-width", "1px");

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.statistics))
      .enter()
      .append('text')
      .attr('class', 'text-pie')
      .text((d: any) => d.data.name)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }
}
