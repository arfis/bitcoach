import {Component, OnInit} from '@angular/core';
import {faTelegram, faFacebook, faDiscord, faYoutube, faInstagram, faMedium, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {MediumService} from '../../../service/medium.service';
import {Observable} from 'rxjs';
import {YoutubeService} from '../../../service/youtube.service';
import {map, shareReplay} from 'rxjs/operators';
import {ViewportScroller} from '@angular/common';
import {SectionType} from './page-sections.enum';
import {PageSectionService} from '../../../service/page-section.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent implements OnInit {

  secondarySocial = [
    {icon: faFacebook, link: 'http://facebook.com'},
    {icon: faYoutube, link: 'http://facebook.com'},
    {icon: faInstagram, link: 'http://facebook.com'},
    {icon: faMedium, link: 'http://facebook.com'},
    {icon: faTwitter, link: 'http://facebook.com'}
  ];

  mainSocial = [
    {icon: faTelegram, link: 'http://facebook.com'},
    {icon: faDiscord, link: 'http://facebook.com'}
  ];

  contributors = [
    'assets/image/contributors/crypto_kylin.png',
    'assets/image/contributors/uniswap.png',
    'assets/image/contributors/avax.png',
    'assets/image/contributors/bsc.png'
  ];
  partners = [
    'assets/image/partners/dao_maker.png'
  ];
  mediumItems$: Observable<any>;
  youtubeItems$: Observable<any>;
  SectionType = SectionType;

  constructor(private mediumService: MediumService,
              private youtubeService: YoutubeService,
              private viewportScroller: ViewportScroller,
              private pageSectionService: PageSectionService) {
    this.mediumItems$ = this.mediumService.getItems();
    this.youtubeItems$ = this.youtubeService.getItems().pipe(shareReplay());
  }

  ngOnInit(): void {
    this.pageSectionService.sectionChange$.subscribe(this.focusSection);
  }

  public focusSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
