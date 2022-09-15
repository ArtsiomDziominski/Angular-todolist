import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ITask, Status} from "../../../interface/tasks";
import {STORAGE_ALL_TASKS_KEY} from "../../const/const";
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxForDeleteComponent} from "../../dialog-box-for-delete/dialog-box-for-delete.component";
import {LocalStorageService} from "../../../service/local-storage/local-storage.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  public readonly status: typeof Status = Status;
  public taskId: number | undefined;
  public task?: ITask;
  public allTasks: ITask[] = [];
  public isEditTask: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
    ) {
  }

  public ngOnInit() {
    this.taskId = Number(this.route.snapshot.params['id']);
    let tasks: string = this.localStorageService.getFromLocalStorage(STORAGE_ALL_TASKS_KEY) || '[]';
    this.allTasks = JSON.parse(tasks);
    this.task = this.allTasks.find((task) => task.id === this.taskId);
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

  public deleteOneTask(id: number): void {
    this.allTasks = this.allTasks.filter(task => task.id !== id);
    this.localStorageService.updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
    this.router.navigate(['/']);
  }

  public editTask(id: number, name: string): void {
    this.isEditTask = !this.isEditTask;
    this.allTasks.find(task => {
      if (Number(task.id) === id) {
        task.name = name;
      }
    })
    this.localStorageService.updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
  }

  public changeStatus(name: string, status: Status): void {
    this.allTasks.find(task => {
      if (task.name === name) {
        task.status = status;
      }
    });
    this.localStorageService.updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
  }
}
