import {RecommenderComponent} from './containers/recommender/recommender.component';
import {RouterModule, Routes} from '@angular/router';
import {MoviesGuard} from '../guards/movies.guard';
import {TilesComponent} from './components/tiles/tiles.component';
import {ResultsComponent} from './components/results/results.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {effects, reducers} from '../../store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


export const ROUTES: Routes = [
  {
    path: 'recommender',
    component: RecommenderComponent,
    canActivateChild: [MoviesGuard],
    children: [{path: '**', component: TilesComponent}]
  }
];

@NgModule({
  declarations: [TilesComponent, ResultsComponent, RecommenderComponent, LoaderComponent],
  imports: [
    BrowserModule,
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(effects),
    RouterModule.forChild(ROUTES),
    CarouselModule
  ],
  entryComponents: [TilesComponent, ResultsComponent],
  providers: [],
})
export class RecommenderModule {
}
