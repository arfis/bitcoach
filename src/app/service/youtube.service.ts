import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  POSTS_URL = `${environment.api}/youtube`;

  constructor(private httpClient: HttpClient) {
  }

  getItems(): Observable<any> {
    return this.httpClient.get<any[]>(this.POSTS_URL).pipe(map(videos => videos.map(item => ({
      id: item.resourceId.videoId,
      episodeNumber: item.episodeNumber,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      image: item.thumbnails.standard.url,
      link: `http://youtube.com/${item.videoId}`
    }))));
  }
}
