import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TaskComponent} from './components/task/task.component';
import {FullVersionComponent} from './components/full-version/full-version.component';
import {MiniVersionComponent} from './components/mini-version/mini-version.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {InputComponent} from './components/input/input.component';
import {DetailComponent} from './components/pages/detail/detail.component';
import {NotFoundComponent} from './components/pages/not-found/not-found.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {MainComponent} from './components/pages/main/main.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from '@angular/material/dialog';
import {DialogBoxForDeleteComponent } from './components/dialog-box-for-delete/dialog-box-for-delete.component';
import { ColumnTasksComponent } from './components/full-version/column-tasks/column-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    FullVersionComponent,
    MiniVersionComponent,
    InputComponent,
    DetailComponent,
    NotFoundComponent,
    MainComponent,
    DialogBoxForDeleteComponent,
    ColumnTasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
