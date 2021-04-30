import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IntroPageComponent} from './pages/intro/intro-page/intro-page.component';

const routes: Routes = [{
  path: '',
  component: IntroPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    enableTracing: true,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
