import {Component, Input, OnInit} from '@angular/core';
import {ITask, Status} from "../../interface/tasks";
import {STORAGE_ALL_TASKS_KEY} from "../const/const";
import {DialogBoxForDeleteComponent} from "../dialog-box-for-delete/dialog-box-for-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {LocalStorageService} from "../../service/local-storage/local-storage.service";

@Component({
  selector: 'app-mini-version',
  templateUrl: './mini-version.component.html',
  styleUrls: ['./mini-version.component.scss']
})

export class MiniVersionComponent implements OnInit {
  public readonly title = 'Angular ToDo List';
  public readonly Status: typeof Status = Status;

  public task: string = '';
  public allTasks: ITask[] = [];
  public isShowInfoContent: boolean = false;
  public dateTime: Date = new Date();

  @Input()
  public isToggleDarkMode?: boolean;

  public countDoneTask(): number {
    return this.allTasks.filter((task) => task.status === Status.Done).length;
  }

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    this.updateTime();
    const getListTask: string = this.localStorageService.getFromLocalStorage(STORAGE_ALL_TASKS_KEY) || '[]';
    this.allTasks = JSON.parse(getListTask);
  }

  public openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogBoxForDeleteComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOneTask(id);
      }
    });
  }

  public toggleDoneTask(task: ITask): void {
    if (task.status === Status.Done) {
      task.status = Status.ToDo;
    } else {
      task.status = Status.Done;
    }
    this.localStorageService.updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
  }

  public deleteOneTask(id: number): void {
    this.allTasks = this.allTasks.filter(task => task.id !== id);
    this.localStorageService.updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
  }

  public deleteDoneTask(): void {
    this.allTasks = this.allTasks.filter((task) => task.status === Status.ToDo);
    this.localStorageService.updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
  }

  public deleteAllTasks(): void {
    this.allTasks = [];
    localStorage.removeItem(STORAGE_ALL_TASKS_KEY);
  }

  public toggleInfoText(): void {
    this.isShowInfoContent = !this.isShowInfoContent;
  }

  public updateTime(): void {
    setInterval(() => this.dateTime = new Date(), 1000);
  }

  public updateAllTasks($event: ITask[]): void {
    this.allTasks = $event;
  }
}
