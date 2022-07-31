import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {getFromLocalStorage} from "../../../get-from-local-storage";
import {ITask, Status} from "../../../interface/tasks";
import {STORAGE_ALL_TASKS_KEY} from "../../const";
import {updateLocalStorage} from "../../../update-local-storage";
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxForDeleteComponent} from "../../dialog-box-for-delete/dialog-box-for-delete.component";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent {
  public readonly status: typeof Status = Status;
  public taskId: number;
  public task?: ITask;
  public allTasks: ITask[] = [];
  public isEditTask: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    this.taskId = Number(this.route.snapshot.params['id']);
    let tasks: string = getFromLocalStorage(STORAGE_ALL_TASKS_KEY) || '[]';
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
    updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
    this.router.navigate(['/']);
  }

  public editTask(id: number, name: string): void {
    this.isEditTask = !this.isEditTask;
    this.allTasks.find(task => {
      if (Number(task.id) === id) {
        task.name = name;
      }
    })
    updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
  }

  public changeStatus(name: string, status: Status): void {
    this.allTasks.find(task => {
      if (task.name === name) {
        task.status = status;
      }
    });
    updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
  }
}
