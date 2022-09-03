import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {ChartJsComponent} from "../../graph/chart-js/chart-js.component";
import {D3Component} from "../../graph/d3/d3.component";
import {ChartJsLineComponent} from "../../graph/chart-js-line/chart-js-line.component";
import {ChartJsPieComponent} from "../../graph/chart-js-pie/chart-js-pie.component";
import {D3PieComponent} from "../../graph/d3-pie/d3-pie.component";
import {D3LineComponent} from "../../graph/d3-line/d3-line.component";

@NgModule({
  declarations: [
    DashboardComponent,
    D3Component,
    ChartJsComponent,
    ChartJsLineComponent,
    ChartJsPieComponent,
    D3PieComponent,
    D3LineComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,

  ],
  exports: [
    ChartJsPieComponent,
    ChartJsLineComponent,
    ChartJsComponent,
    D3PieComponent,
    D3LineComponent,
    D3Component
  ],
})
export class DashboardModule {
}
