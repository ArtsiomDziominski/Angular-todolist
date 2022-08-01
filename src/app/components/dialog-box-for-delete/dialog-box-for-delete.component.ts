import {Component} from '@angular/core';

@Component({
  selector: 'app-dialog-box-for-delete',
  templateUrl: './dialog-box-for-delete.component.html',
  styleUrls: ['./dialog-box-for-delete.component.css']
})
export class DialogBoxForDeleteComponent {
  public isDeleteSelectedTask: boolean = true;
}
