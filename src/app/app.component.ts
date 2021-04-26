import {Component} from '@angular/core';
import {SectionType} from './pages/intro/intro-page/page-sections.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public pageSection: SectionType = SectionType.INTRO;
  title = 'bitcoach-onepager';
}
