import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediumService {
  POSTS_URL = `${environment.api}/medium`;

  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<any> {
    return this.httpClient.get<any>(this.POSTS_URL);
  }
}
