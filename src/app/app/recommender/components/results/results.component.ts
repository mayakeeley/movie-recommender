import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../../store';
import * as fromActions from '../../../../store/actions';
import {MovieModel} from '../../../../models';
import * as fromSelectors from '../../../../store/selectors';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public loading: Observable<boolean>;
  public loaded: Observable<boolean>;
  public movies: MovieModel[];

  constructor(private store: Store<fromStore.MoviesState>) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new fromActions.MoviesGetRecommended());
    this.loading = this.store.select(fromSelectors.getLoading);
    this.loaded = this.store.select(fromSelectors.getLoaded);
    this.store.select(fromSelectors.getSuggestedMovies).subscribe(movies => {
      this.movies = movies;
    });
  }

}
