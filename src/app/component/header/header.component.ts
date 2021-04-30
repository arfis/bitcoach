import { Component, OnInit } from '@angular/core';
import {SectionType} from '../../pages/intro/intro-page/page-sections.enum';
import {PageSectionService} from '../../service/page-section.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  SectionType = SectionType;
  public isMenuOpened = false;
  constructor(private sectionService: PageSectionService,
              private translateService: TranslateService,
              private router: ActivatedRoute) {
    this.router.fragment.subscribe(() => this.isMenuOpened = false);
  }

  ngOnInit(): void {
  }

  public changeLang(lang: string): void {
    this.translateService.use(lang);
  }

  public navigateSection(section: any): void {
    this.sectionService.sectionChange$.next(section);
  }

  public toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
