import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public getFromLocalStorage(storageKey:string): string | null {
    return localStorage.getItem(storageKey);
  }

  public updateLocalStorage(storageKey: string, storageName: string): void {
    localStorage.setItem(storageKey, storageName);
  }
}
