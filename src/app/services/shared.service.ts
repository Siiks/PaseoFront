import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private updateSubject = new Subject<void>();

  updateNotification$ = this.updateSubject.asObservable();

  triggerUpdate() {
    this.updateSubject.next();
  }
}
