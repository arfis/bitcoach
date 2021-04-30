import {AfterViewInit, Component, OnInit} from '@angular/core';
import {faTelegram, faFacebook, faDiscord, faYoutube, faInstagram, faMedium, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {MediumService} from '../../../service/medium.service';
import {Observable} from 'rxjs';
import {YoutubeService} from '../../../service/youtube.service';
import {map, shareReplay} from 'rxjs/operators';
import {ViewportScroller} from '@angular/common';
import {SectionType} from './page-sections.enum';
import {PageSectionService} from '../../../service/page-section.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent implements OnInit, AfterViewInit {

  secondarySocial = [
    {icon: faFacebook, link: 'https://www.facebook.com/bitc0ach'},
    {icon: faYoutube, link: 'https://www.youtube.com/c/Bitcoach'},
    {icon: faInstagram, link: 'https://instagram.com/bitc0ach'},
    {icon: faMedium, link: 'https://medium.com/bitcoach'},
    {icon: faTwitter, link: 'https://twitter.com/bitc0ach'}
  ];

  mainSocial = [
    {icon: faTelegram, link: 'http://facebook.com'},
    {icon: faDiscord, link: 'http://facebook.com'}
  ];

  contributors = [
    {image: 'assets/image/contributors/chainlink_ok.png', url: 'https://chain.link/', widthOrientation: false},
    {
      image: 'assets/image/contributors/avax_ok.png',
      url: 'https://www.avalabs.org/',
      widthOrientation: false
    },
    {image: 'assets/image/contributors/polkadot_ok.png', url: 'https://polkadot.network/', widthOrientation: false},
    {image: 'assets/image/contributors/uniswap_ok.png', url: 'https://uniswap.org/', widthOrientation: true},
    {image: 'assets/image/contributors/wsb_ok.png', url: 'https://www.wsbdapp.com/', widthOrientation: true},
    {image: 'assets/image/contributors/blockbank_ok.png', url: 'https://blockbank.ai/', widthOrientation: false},
    {image: 'assets/image/contributors/goswapp_ok.png', url: 'https://goswapp.io/', widthOrientation: false},
    {image: 'assets/image/contributors/kylin_ok.png', url: 'https://kylin.network/', widthOrientation: false},
    {image: 'assets/image/contributors/mainframe_ok.png', url: 'https://hifi.finance/', widthOrientation: false},
    {image: 'assets/image/contributors/origintrail_ok.png', url: 'https://origintrail.io/', widthOrientation: false},
    {image: 'assets/image/contributors/orion_ok.png', url: 'https://www.orionprotocol.io/', widthOrientation: false},
    {image: 'assets/image/contributors/quantstamp_ok.png', url: 'https://quantstamp.com/', widthOrientation: false},
    {image: 'assets/image/contributors/ramp_ok.png', url: 'https://rampdefi.com/', widthOrientation: false},
    {image: 'assets/image/contributors/sovryn_black_ok.png', url: 'https://www.sovryn.app/', widthOrientation: false},
    {image: 'assets/image/contributors/tacen_ok.png', url: 'https://tacen.com/', widthOrientation: false},
    {image: 'assets/image/contributors/tenset_ok.png', url: 'https://tenset.io/', widthOrientation: false},
  ];
  partners = [
    'assets/image/partners/dao_maker.png'
  ];
  mediumItems$: Observable<any>;
  youtubeItems$: Observable<any>;
  SectionType = SectionType;

  fragment = '';

  constructor(private mediumService: MediumService,
              private youtubeService: YoutubeService,
              private viewportScroller: ViewportScroller,
              private pageSectionService: PageSectionService,
              private route: ActivatedRoute) {
    this.mediumItems$ = this.mediumService.getItems();
    this.youtubeItems$ = this.youtubeService.getItems().pipe(shareReplay());
  }

  ngOnInit(): void {
    // this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit(): void {
    // try {
    //   // @ts-ignore
    //   document.querySelector('#' + (this.fragment ?? '')).scrollIntoView();
    // } catch (e) { }
  }

  public focusSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
