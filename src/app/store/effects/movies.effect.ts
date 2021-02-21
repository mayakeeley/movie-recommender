import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Store } from '@ngrx/store';
import { MoviesState } from '../reducers';
import { MovieModel } from '../../models/movie.model';

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

  @Effect()
  public confirmSelection$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_CONFIRM_SELECTION),
    withLatestFrom(
      this.store.select(fromSelectors.getSelectedMovies),
      this.store.select(fromSelectors.getRemainingMovies)
    ),
    map(([never, selectedMovies, allMovies]) => {
      const keywords = this.getFrequencyOfTerm(selectedMovies, 'keywords');
      const genres = this.getFrequencyOfTerm(selectedMovies, 'genres');
      const scoredMovies = this.scoreMovies(allMovies, keywords, genres);
      return new fromActions.MoviesConfirmSelectionSuccess({
        scoredMovies,
        keywords,
        genres,
      });
    })
  );

  @Effect()
  public restart$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_RESTART),
    map(() => {
      return new fromActions.MoviesGet();
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
        const index = terms.findIndex((termItem) => {
          return termItem.id === item.id;
        });
        if (index !== -1) {
          terms[index].frequency += terms[index].frequency;
        } else {
          terms.push({ ...item, frequency: 1 });
        }
      });
    });
    return terms;
  }

  public scoreMovies(movies, keywords, genres): MovieModel[] {
    return movies
      .map((movie, index) => {
        let score = 0;
        movie.keywords.forEach((keyword) => {
          const matchingKeyword = keywords.find(
            (item) => item.id === keyword.id
          );
          if (matchingKeyword) {
            score = score + matchingKeyword.frequency;
          }
        });
        movie.genres.forEach((genre) => {
          const matchingGenre = genres.find((item) => item.id === genre.id);
          if (matchingGenre) {
            score = score + matchingGenre.frequency;
          }
        });
        return {
          ...movie,
          score,
        };
      })
      .sort((a, b) => b.score - a.score);
  }
}
