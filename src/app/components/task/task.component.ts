import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITask, Status} from "../../interface/tasks";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent {
  public readonly Status: typeof Status = Status;

  @Input() public task?: ITask;
  @Output() public changeStatus: EventEmitter<void> = new EventEmitter<void>();

  public toggleDoneTask(): void {
    this.changeStatus.emit();
  }
}
