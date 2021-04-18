import {Component, Input, OnInit} from '@angular/core';
import {MediumService} from '../../service/medium.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() autoWidth = false;
  @Input() allItemsUrl = '';


  ngOnInit(): void {
  }

  navigate(link: string): void {
    window.location.assign(link);
  }

}
