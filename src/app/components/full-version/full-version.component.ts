import {Component} from '@angular/core';
import {ITask, Status} from "../../interface/tasks";
import {getFromLocalStorage} from "../../get-from-local-storage";
import {STORAGE_ALL_TASKS_KEY} from "../const/const";

@Component({
  selector: 'app-full-version',
  templateUrl: './full-version.component.html',
  styleUrls: ['./full-version.component.scss']
})

export class FullVersionComponent {
  public readonly status: typeof Status = Status;
  public allTasks: ITask[] = [];
  public name: string = '';

  public countToDoTask(): number {
    return this.allTasks.filter((task) => task.status === Status.ToDo).length;
  }

  public countInProgressTask(): number {
    return this.allTasks.filter((task) => task.status === Status.InProgress).length;
  }

  public countDoneTask(): number {
    return this.allTasks.filter((task) => task.status === Status.Done).length;
  }

  constructor() {
    let getListTask:string = getFromLocalStorage(STORAGE_ALL_TASKS_KEY) || '[]';
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
    console.log(this.allTasks)
  }
}
