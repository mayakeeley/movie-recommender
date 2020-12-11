import { Component, OnInit } from '@angular/core';
import * as fromStore from './store';
import * as fromSelectors from './store/selectors';
import * as fromActions from './store/actions';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { MovieModel } from './models/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public movies: MovieModel[];
  public confirmed: boolean;
  public loading$ = this.store.select(fromSelectors.getLoading);
  public selectedMovies: MovieModel[];
  public message: string;
  public scoredMovies: MovieModel[];
  constructor(private store: Store<fromStore.MoviesState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new fromActions.MoviesGet());
    combineLatest(
      this.store.select(fromSelectors.getLoadingMessage),
      this.store.select(fromSelectors.getPopularMovies),
      this.store.select(fromSelectors.getSelectedMovies),
      this.store.select(fromSelectors.getConfirmedSelection),
      this.store.select(fromSelectors.getScoredMovies)
    ).subscribe(([message, movies, selectedMovies, confirmed, scored]) => {
      this.message = message;
      this.movies = movies;
      this.selectedMovies = selectedMovies;
      this.confirmed = confirmed;
      this.scoredMovies = scored;
    });
  }

  public selectMovie(movie): void {
    if (this.selectedMovies.includes(movie)) {
      this.store.dispatch(new fromActions.MoviesDeselect(movie));
    } else if (
      !this.selectedMovies.includes(movie) &&
      this.selectedMovies.length < 5
    ) {
      this.store.dispatch(new fromActions.MoviesSelect(movie));
    }
  }

  public confirmSelection(): void {
    if (this.selectedMovies.length === 5) {
      this.store.dispatch(new fromActions.MoviesConfirmSelection());
    }
  }

  public restart(): void {
    this.store.dispatch(new fromActions.MoviesRestart());
  }
}
