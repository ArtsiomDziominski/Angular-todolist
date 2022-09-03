import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {MainComponent} from "./components/pages/main/main.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'details/:id',
    loadChildren: () => import('./components/pages/detail/detail.module').then(m => m.DetailModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {path: '**', component: NotFoundComponent}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
