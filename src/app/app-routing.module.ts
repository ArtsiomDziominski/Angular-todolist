import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DetailComponent} from "./components/pages/detail/detail.component";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {MainComponent} from "./components/pages/main/main.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'details/:id', component: DetailComponent},
  {path: '**', component: NotFoundComponent}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
