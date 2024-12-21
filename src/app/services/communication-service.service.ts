import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {
  private actionSource = new Subject<void>();
  action$ = this.actionSource.asObservable();

  constructor() { }

  triggerAction() {
    this.actionSource.next();
  }
}
