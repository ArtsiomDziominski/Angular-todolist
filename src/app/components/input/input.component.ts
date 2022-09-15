import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITask, Status} from "../../interface/tasks";
import {STORAGE_ALL_TASKS_KEY} from "../const/const";
import {LocalStorageService} from "../../service/local-storage/local-storage.service";

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

  constructor(private localStorageService: LocalStorageService) {
  }

  public ngOnInit(): void {
    const getListTask: string = this.localStorageService.getFromLocalStorage(STORAGE_ALL_TASKS_KEY) || '[]';
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
      this.localStorageService.updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
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
