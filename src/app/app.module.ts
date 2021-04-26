import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IntroPageComponent} from './pages/intro/intro-page/intro-page.component';
import {CarouselComponent} from './component/carousel/carousel.component';
import { VideoCarouselComponent } from './component/video-carousel/video-carousel.component';
import {MatIconModule} from '@angular/material/icon';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FeedListComponent } from './component/feed-list/feed-list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { CurrencyInfoComponent } from './component/currency-info/currency-info.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    IntroPageComponent,
    CarouselComponent,
    VideoCarouselComponent,
    FeedListComponent,
    HeaderComponent,
    CurrencyInfoComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([], {anchorScrolling: 'enabled'}),
    FontAwesomeModule,
    NgbCarouselModule,
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
