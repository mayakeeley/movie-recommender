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
import {RouterModule, Routes} from '@angular/router';
import {RecommenderModule} from './app/recommender/recommender.module';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'recommender',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [AppComponent],
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
    RouterModule.forRoot(ROUTES),
    RecommenderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
