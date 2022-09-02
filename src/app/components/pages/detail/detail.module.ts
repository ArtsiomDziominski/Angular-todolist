import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailRoutingModule} from "./detail-routing.module";
import {DetailComponent} from "./detail.component";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule
  ]
})
export class DetailModule {}
