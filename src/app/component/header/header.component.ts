import { Component, OnInit } from '@angular/core';
import {SectionType} from '../../pages/intro/intro-page/page-sections.enum';
import {PageSectionService} from '../../service/page-section.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  SectionType = SectionType;
  constructor(private sectionService: PageSectionService, private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  public changeLang(lang: string): void {
    this.translateService.use(lang);
  }

  public navigateSection(section: any): void {
    this.sectionService.sectionChange$.next(section);
  }
}
