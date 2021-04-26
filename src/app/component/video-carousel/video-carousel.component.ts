import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-video-carousel',
  templateUrl: './video-carousel.component.html',
  styleUrls: ['./video-carousel.component.scss']
})
export class VideoCarouselComponent implements OnInit {

  @ViewChild(NgbCarousel) carousel: NgbCarousel | undefined;
  @Input() videos: any[] = [];

  public activeId: string = '';
  public videoUrl: any = null;
  public offset = 0;
  public visibleVideoCount = 7;
  public rightPosition = 0;
  public videoWidth = 130;

  constructor(config: NgbCarouselConfig, private sanitizer: DomSanitizer) {
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    if (this.videos) {
      this.activeId = this.videos[0]?.id;
    }
  }

  public onSlide(slideEvent: any): void{
    const {direction, current} = slideEvent;
    this.activeId = current;

    switch (direction) {
      case Movement.LEFT: {
        this.next();
        break;
      }
      case Movement.RIGHT: {
        this.previous();
        break;
      }
    }
    // Movement
  }

  public play(videoId: string): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
  }

  public previous(): void {
    if (this.offset > 0) {
      this.offset--;
      this.rightPosition -= this.videoWidth;
    }
  }

  public next(): void {
    if (this.offset + this.visibleVideoCount < this.videos.length) {
      this.offset++;
      this.rightPosition += this.videoWidth;
    }
  }

  public listPlay(video: any): void {
    if (this.videoUrl) {
      this.play(video.id);
    }

    this.activeId = video.id;
    this.carousel?.select(this.activeId);
  }

  public get canGoNext(): boolean {
    return this.offset + this.visibleVideoCount !== this.videos?.length;
  }

  public get canGoPrevious(): boolean {
    return this.offset !== 0;
  }
}

enum Movement {
  LEFT = 'left', RIGHT = 'right'
}
