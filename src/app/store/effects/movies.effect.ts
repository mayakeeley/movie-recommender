import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MoviesService } from '../../services/movies.service';
import { Papa } from 'ngx-papaparse';

@Injectable()
export class MoviesEffect {
  @Effect()
  public getMovies$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_GET),
    switchMap(() => {
      return this.moviesService.getMovies().pipe(
        map((movies) => {
          const options = {
            complete: (result) => {
              return result.data;
            },
            header: true,
          };
          const parsedMovies = this.papa.parse(movies, options);
          return new fromActions.MoviesGetSuccess(parsedMovies);
        }),
        catchError((error) => of(new fromActions.MoviesGetFail()))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private papa: Papa
  ) {}
}
