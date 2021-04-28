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
    {
      image: 'assets/image/contributors/avax_ok.png',
      url: 'https://www.avalabs.org/'
    },
    {image: 'assets/image/contributors/blockbank_ok.png', url: 'https://blockbank.ai/' },
    {image: 'assets/image/contributors/chainlink_ok.png', url: 'https://chain.link/'},
    {image: 'assets/image/contributors/goswapp_ok.png', url: 'https://goswapp.io/'},
    {image: 'assets/image/contributors/kylin_ok.png', url: 'https://kylin.network/'},
    {image: 'assets/image/contributors/mainframe_ok.png', url: 'https://hifi.finance/'},
    {image: 'assets/image/contributors/origintrail_ok.png', url: 'https://origintrail.io/'},
    {image: 'assets/image/contributors/orion_ok.png', url: 'https://www.orionprotocol.io/'},
    {image: 'assets/image/contributors/polkadot_ok.png', url: 'https://polkadot.network/'},
    {image: 'assets/image/contributors/quantstamp_ok.png', url: 'https://quantstamp.com/'},
    {image: 'assets/image/contributors/ramp_ok.png', url: 'https://rampdefi.com/'},
    {image: 'assets/image/contributors/sovryn_black_ok.png', url: 'https://www.sovryn.app/'},
    {image: 'assets/image/contributors/tacen_ok.png', url: 'https://tacen.com/'},
    {image: 'assets/image/contributors/tenset_ok.png', url: 'https://tenset.io/'},
    {image: 'assets/image/contributors/uniswap_ok.png', url: 'https://uniswap.org/'},
    {image: 'assets/image/contributors/wsb_ok.png', url: 'https://www.wsbdapp.com/'},
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
