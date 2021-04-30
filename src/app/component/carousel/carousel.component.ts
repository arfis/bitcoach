import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  @Input() images = ['assets/image/carousel_1.png'];
  hasMoved = false;

  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.hasMoved = true, 200);
  }
}
