import {HostListener, Component, OnInit} from '@angular/core';
import {getFromLocalStorage} from "../../../get-from-local-storage";
import {STORAGE_ALL_TASKS_KEY} from "../../const/const";
import {ITask, Status} from "../../../interface/tasks";
import {AmountTasks} from "../../../interface/amountTasks";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public amountTaskToDo: number = 0;
  public amountTaskInProgress: number = 0;
  public amountTaskDone: number = 0;
  public isGraphD3: boolean = true;
  public status?: Status;
  public statusName: string[] = [];
  public statusAmount: number[] = [];
  public windowWidth!:number;

  public allTasks: ITask[] = [];

  public statistics: AmountTasks[] = [];

  public saveAmountTasks(name: string, amount: number): void {
    this.statistics.push({name: name, amount: amount});
  }

  public ngOnInit(): void {
    let allTasks: string | null = getFromLocalStorage(STORAGE_ALL_TASKS_KEY);
    this.allTasks = JSON.parse(<string>allTasks);
    this.allTasks.forEach((count) => {
      switch (count.status) {
        case Status.ToDo:
          this.amountTaskToDo++;
          break;
        case Status.InProgress:
          this.amountTaskInProgress++;
          break;
        case Status.Done:
          this.amountTaskDone++;
      }
    })
    this.saveAmountTasks(Status.ToDo, this.amountTaskToDo);
    this.saveAmountTasks(Status.InProgress, this.amountTaskInProgress);
    this.saveAmountTasks(Status.Done, this.amountTaskDone);

    this.statistics.forEach(name => {
      this.statusName.push(name.name);
      this.statusAmount.push(name.amount);
    });
  }

  public toggleGraph(): void {
    this.isGraphD3=!this.isGraphD3;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.windowWidth = event.target.innerWidth-40;
  }

}
