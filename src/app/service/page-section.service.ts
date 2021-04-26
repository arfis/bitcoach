import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageSectionService {
  public sectionChange$ = new Subject<string>();

  constructor() { }
}
