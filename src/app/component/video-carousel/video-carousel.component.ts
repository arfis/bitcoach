import {Component, Input, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-carousel',
  templateUrl: './video-carousel.component.html',
  styleUrls: ['./video-carousel.component.scss']
})
export class VideoCarouselComponent {

  @Input() videos: any[] = [];
  public playingVideo: string | null = null;

  constructor(config: NgbCarouselConfig) {
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  public play(video: string): void {
    this.playingVideo = video;
  }
}
