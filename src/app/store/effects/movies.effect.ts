import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MoviesService } from '../../services/movies.service';

@Injectable()
export class EnquiryEffect {
  @Effect()
  public getIndustries$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_GET),
    switchMap(() => {
      return this.moviesService.getMovies().pipe(
        map((movies) => new fromActions.MoviesGetSuccess(movies)),
        catchError((error) => of(new fromActions.MoviesGetFail()))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
