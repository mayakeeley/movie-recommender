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
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public movies: { [key: string]: MovieModel } = {};
  public loading$ = this.store.select(fromSelectors.getLoading);
  public message: string;
  constructor(private store: Store<fromStore.MoviesState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new fromActions.MoviesGet());
    combineLatest(
      this.store.select(fromSelectors.getLoadingMessage),
      this.store.select(fromSelectors.getAllMovies)
    ).subscribe(([message, movies]) => {
      this.message = message;
      this.movies = movies;
    });
  }
}
