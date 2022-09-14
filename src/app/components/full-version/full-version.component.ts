import {Component, OnInit} from '@angular/core';
import {ITask, Status} from "../../interface/tasks";
import {STORAGE_ALL_TASKS_KEY} from "../const/const";
import {LocalStorageService} from "../../service/local-storage/local-storage.service";

@Component({
  selector: 'app-full-version',
  templateUrl: './full-version.component.html',
  styleUrls: ['./full-version.component.scss']
})

export class FullVersionComponent implements OnInit{
  public readonly status: typeof Status = Status;
  public allTasks: ITask[] = [];
  public name: string = '';

  constructor(private localStorageService: LocalStorageService) {
  }

  public countToDoTask(): number {
    return this.allTasks.filter((task) => task.status === Status.ToDo).length;
  }

  public countInProgressTask(): number {
    return this.allTasks.filter((task) => task.status === Status.InProgress).length;
  }

  public countDoneTask(): number {
    return this.allTasks.filter((task) => task.status === Status.Done).length;
  }

  public ngOnInit(): void {
    let getListTask:string = this.localStorageService.getFromLocalStorage(STORAGE_ALL_TASKS_KEY) || '[]';
    this.allTasks = JSON.parse(getListTask);
  }

  public get todo(): ITask[] {
    return this.allTasks.filter((task: ITask) => task.status === Status.ToDo);
  }

  public get inProgress(): ITask[] {
    return this.allTasks.filter((task: ITask) => task.status === Status.InProgress);
  }

  public get done(): ITask[] {
    return this.allTasks.filter((task: ITask) => task.status === Status.Done);
  }

  public updateAllTasks($event: ITask[]): void {
    this.allTasks = $event;
  }
}
