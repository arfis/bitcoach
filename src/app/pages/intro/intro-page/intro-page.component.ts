import {Component, OnInit} from '@angular/core';
import {faTelegram, faFacebook, faDiscord, faYoutube, faInstagram, faMedium, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {MediumService} from '../../../service/medium.service';
import {Observable} from 'rxjs';
import {YoutubeService} from '../../../service/youtube.service';
import {map, shareReplay} from 'rxjs/operators';

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
    'assets/image/uniswap-io-vector-logo.png',
    'assets/image/uniswap-io-vector-logo.png',
    'assets/image/uniswap-io-vector-logo.png',
    'assets/image/uniswap-io-vector-logo.png'
  ];
  partners = [
    'assets/image/uniswap-io-vector-logo.png'
  ];
  mediumItems$: Observable<any>;
  youtubeItems$: Observable<any>;

  constructor(private mediumService: MediumService,
              private youtubeService: YoutubeService) {
    this.mediumItems$ = this.mediumService.getItems();
    this.youtubeItems$ = this.youtubeService.getItems().pipe(shareReplay());
  }

  ngOnInit(): void {
  }

}
