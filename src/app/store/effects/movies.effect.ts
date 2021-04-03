import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {MoviesService} from '../../services/movies.service';
import {Store} from '@ngrx/store';
import {MoviesState} from '../reducers';
import {MovieModel, ConfigModel} from '../../models';
import {NodeTypesEnum} from '../../enums';
import {Router} from '@angular/router';
import {TilesComponent} from '../../app/tiles/tiles.component';
import {ResultsComponent} from '../../app/results/results.component';

@Injectable()
export class MoviesEffect {
  @Effect()
  public getMovies$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_GET),
    switchMap(() => {
      return this.moviesService.getMovies().pipe(
        map((movies) => {
          return new fromActions.MoviesGetSuccess(movies);
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

  @Effect()
  public startJourney$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_START),
    switchMap(() => {
      return this.moviesService.getConfigData().pipe(
        map(tree => {
          const currentStep = this.getCurrentStep(tree[0]);
          this.addRoutes([currentStep]);
          return new fromActions.MoviesStartSuccess(currentStep);
        }),
        catchError(error => of(new fromActions.MoviesStartFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store: Store<MoviesState>,
    private router: Router
  ) {
  }

  public getCurrentStep(tree: ConfigModel): ConfigModel {
    // create shallow copy of currentRoute up to the next valid question id
    return {
      ...tree,
      children: tree.children
        ? tree.children.map(child => {
          return {
            ...child,
            children: child.children
              ? child.children.map(grandchild => {
                return {
                  ...grandchild,
                  children:
                    grandchild.nodeType === NodeTypesEnum.outcome && grandchild.children
                      ? grandchild.children.map(greatGrandChild => {
                        return {
                          ...greatGrandChild,
                          children: undefined
                        };
                      })
                      : undefined
                };
              })
              : undefined
          };
        })
        : undefined
    };

  }

  public addRoutes(steps: ConfigModel[]): void {
    this.router.config[0].children = this.createRoutes(steps);
  }

  private createRoutes(steps: ConfigModel[]): any {
    return steps.map(step => {
      if (step.nodeType === NodeTypesEnum.question) {
        return {
          path: step.nodeId,
          component: TilesComponent
        };
      }
      if (step.nodeType === NodeTypesEnum.results) {
        return {
          path: step.nodeId,
          component: ResultsComponent
        };
      }
    });
  }

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
          terms.push({...item, frequency: 1});
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
