import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { AppTilesComponent } from './app/app-tiles/app-tiles.component';

@NgModule({
  declarations: [AppComponent, AppTilesComponent],
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
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
