import {Component, OnInit} from '@angular/core';
import {getFromLocalStorage} from "../../../get-from-local-storage";
import {STORAGE_DARK_MODE_KEY, STORAGE_VERSION_KEY} from "../../const";
import {updateLocalStorage} from "../../../update-local-storage";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  public isFullVersion: boolean = false;
  public isToggleDarkMode: boolean = false;

  public ngOnInit(): void {
    this.isFullVersion = getFromLocalStorage(STORAGE_VERSION_KEY) === 'true';
    this.isToggleDarkMode = getFromLocalStorage(STORAGE_DARK_MODE_KEY) === 'true';
  }

  public toggleVersion(): void {
    this.isFullVersion = !this.isFullVersion;
    updateLocalStorage(STORAGE_VERSION_KEY, String(this.isFullVersion));
  }

  public ToggleDarkMode(): void {
    this.isToggleDarkMode = !this.isToggleDarkMode
    updateLocalStorage(STORAGE_DARK_MODE_KEY, String(this.isToggleDarkMode));
  }
}
