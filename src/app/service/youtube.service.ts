import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  POSTS_URL = `${environment.api}/youtube`;

  constructor(private httpClient: HttpClient) {
  }

  getItems(): Observable<any> {
    return this.httpClient.get<any>(this.POSTS_URL).pipe(map(({items}) => (items as any[]).map(item => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      image: item.snippet.thumbnails.standard.url,
      link: `http://youtube.com/${item.id.videoId}`
    }))));
  }
}
