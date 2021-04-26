import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediumService {
  POSTS_URL = `${environment.api}/medium`;

  constructor(private httpClient: HttpClient) {
  }

  getItems(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.POSTS_URL).pipe(map(items => items.map(item => ({
        ...item,
        description: this.stripHtml(item.description)
      })
    )));
  }

  public stripHtml(description: string): string {
    const tag = document.createElement('div');
    tag.innerHTML = description;
    return tag.innerText.slice(0, 200) + '...';
  }
}
