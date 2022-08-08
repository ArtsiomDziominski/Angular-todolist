import {Component, OnInit} from '@angular/core';
import {getFromLocalStorage} from "../../../get-from-local-storage";
import {STORAGE_ALL_TASKS_KEY} from "../../const";
import {ITask} from "../../../interface/tasks";
import {Frequency} from "../../../interface/frequency";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public amountTaskToDo: number = 0;
  public amountTaskInProgress: number = 0;
  public amountTaskDone: number = 0;
  public isToggleGraph: boolean = true;

  public allTasks: ITask[] = [];

  public statistics: Frequency[] = [];

  public saveAmountTasks(name: string, amount: number): void {
    this.statistics.push({letter: name, frequency: amount});
  }

  public ngOnInit(): void {
    let toDo: string = 'To Do';
    let InProgress: string = 'In Progress';
    let Done: string = 'Done';

    let allTasks: string | null = getFromLocalStorage(STORAGE_ALL_TASKS_KEY);
    this.allTasks = JSON.parse(<string>allTasks);
    this.allTasks.forEach((count) => {
      if (count.status === 'todo') {
        this.amountTaskToDo++;
      } else if (count.status === 'inProgress') {
        this.amountTaskInProgress++;
      } else if (count.status === 'done') {
        this.amountTaskDone++;
      }
    })
    this.saveAmountTasks(toDo, this.amountTaskToDo);
    this.saveAmountTasks(InProgress, this.amountTaskInProgress);
    this.saveAmountTasks(Done, this.amountTaskDone);
  }
}
