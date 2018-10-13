import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor (
    private notifier: NotifierService
  ) { }

  public show ( type: string, content: string): void {
    this.notifier.notify(type, content);
  }

  public removeAll () {
    this.notifier.hideAll();
  }
}
