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
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { CurrencyInfoComponent } from './component/currency-info/currency-info.component';

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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
