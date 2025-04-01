import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public loggedIn = new BehaviorSubject<any>({
    customProperty: false
  });
}