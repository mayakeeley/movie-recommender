import {Component, OnInit} from '@angular/core';
import * as fromStore from './store';
import * as fromActions from './store/actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromStore.MoviesState>) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new fromActions.MoviesStart());
  }

}
