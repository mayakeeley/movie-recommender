import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Store } from '@ngrx/store';
import { MoviesState } from '../reducers';

@Injectable()
export class MoviesEffect {
  @Effect()
  public getMovies$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_GET),
    switchMap(() => {
      return this.moviesService.getMovies().pipe(
        map((movies) => {
          const allMovies = JSON.parse(movies);
          return new fromActions.MoviesGetSuccess(allMovies);
        }),
        catchError((error) => of(new fromActions.MoviesGetFail(error)))
      );
    })
  );

  public confirmSelection$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_CONFIRM_SELECTION),
    withLatestFrom(this.store.select(fromSelectors.getSelectedMovies)),
    map(([never, selectedMovies]) => {
      console.log('confirm selection');
      const keywords = this.getFrequencyOfTerm(selectedMovies, 'keywords');
      const genres = this.getFrequencyOfTerm(selectedMovies, 'genres');
      return new fromActions.MoviesConfirmSelectionSuccess({
        keywords,
        genres,
      });
    })
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store: Store<MoviesState>
  ) {}

  public getFrequencyOfTerm(selectedMovies, term): any[] {
    const terms = [];
    selectedMovies.forEach((movie) => {
      movie[term].forEach((item) => {
        const index = terms.indexOf(item);
        if (index !== -1) {
          terms[index].frequency = terms[index].frequency + 1;
        } else {
          terms.push({ ...item, frequency: 1 });
        }
      });
    });
    return terms;
  }
}
