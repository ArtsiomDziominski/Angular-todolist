import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {ITask, Status} from "../../../interface/tasks";
import {updateLocalStorage} from "../../../update-local-storage";
import {STORAGE_ALL_TASKS_KEY} from "../../const";
import {DialogBoxForDeleteComponent} from "../../dialog-box-for-delete/dialog-box-for-delete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-column-tasks',
  templateUrl: './column-tasks.component.html',
  styleUrls: ['./column-tasks.component.scss']
})
export class ColumnTasksComponent {
  public readonly status: typeof Status = Status;

  @Input() public countTask!: number;
  @Input() public allTasks?: ITask[];
  @Input() public allStatus?: ITask[];
  @Input() public getStatus!: Status;
  @Input() public title!: string;

  @Output() public updateAllTasks: EventEmitter<ITask[]> = new EventEmitter<ITask[]>();

  constructor(public dialog: MatDialog) {}

  public dropDown(event: CdkDragDrop<ITask[]>, status: Status): void {
    let task: ITask | undefined = this.allTasks?.find((item: ITask) => item.id === event.item.data.id);
    if (task) {
      task.status = status;
    }
    updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
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
    this.allTasks = this.allTasks?.filter((task) => task.id !== id);
    updateLocalStorage(STORAGE_ALL_TASKS_KEY, JSON.stringify(this.allTasks));
    this.updateAllTasks.emit(this.allTasks);
  }
}
