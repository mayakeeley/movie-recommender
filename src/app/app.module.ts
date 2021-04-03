import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';

import {AppComponent} from './app.component';
import {reducers, effects} from './store';
import {EffectsModule} from '@ngrx/effects';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {TilesComponent} from './app/tiles/tiles.component';
import {RouterModule, Routes} from '@angular/router';
import { ResultsComponent } from './app/results/results.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivateChild: [],
    children: [{path: '**', component: TilesComponent}]
  }
];

@NgModule({
  declarations: [AppComponent, TilesComponent, ResultsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(effects),
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    CarouselModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
