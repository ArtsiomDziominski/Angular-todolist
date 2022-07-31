import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITask, Status} from "../../interface/tasks";
import {getFromLocalStorage} from "../../get-from-local-storage";
import {updateLocalStorage} from "../../update-local-storage";
import {STORAGE_ALL_TASKS_KEY} from "../const";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() allTasks: ITask[] = [];
  @Output() changeStatusAllTasks: EventEmitter<ITask[]> = new EventEmitter<ITask[]>();
  public task: string = '';
  public isInvalidInput: boolean = false;

  public ngOnInit(): void {
    const getListTask: string = getFromLocalStorage(STORAGE_ALL_TASKS_KEY) || '[]';
    this.allTasks = JSON.parse(getListTask);
  }

  public addTaskToList(name: string): void {
    const newTask: string = name.trim();
    if (newTask) {
      this.isInvalidInput = false;
      const dataTasks: ITask = {
        id: Math.random(),
        name: name,
        status: Status.ToDo,
        date: new  Date()
      };
      this.allTasks.push(dataTasks);
      updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
      this.task = '';
    } else {
      this.isInvalidInput = true;
    }
    this.changeStatusAllTasks.emit(this.allTasks);
  }

  public closeError(): void {
    this.isInvalidInput = false;
  }
}
