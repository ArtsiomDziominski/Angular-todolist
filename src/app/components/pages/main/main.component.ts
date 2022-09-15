import {Component, OnInit} from '@angular/core';
import {STORAGE_DARK_MODE_KEY, STORAGE_VERSION_KEY} from "../../const/const";
import {LocalStorageService} from "../../../service/local-storage/local-storage.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  public isFullVersion: boolean = false;
  public isToggleDarkMode: boolean = false;

  constructor(private localStorageService: LocalStorageService) {
  }

  public ngOnInit(): void {
    this.isFullVersion = this.localStorageService.getFromLocalStorage(STORAGE_VERSION_KEY) === 'true';
    this.isToggleDarkMode = this.localStorageService.getFromLocalStorage(STORAGE_DARK_MODE_KEY) === 'true';
  }

  public toggleVersion(): void {
    this.isFullVersion = !this.isFullVersion;
    this.localStorageService.updateLocalStorage(STORAGE_VERSION_KEY, String(this.isFullVersion));
  }

  public ToggleDarkMode(): void {
    this.isToggleDarkMode = !this.isToggleDarkMode
    this.localStorageService.updateLocalStorage(STORAGE_DARK_MODE_KEY, String(this.isToggleDarkMode));
  }
}
