import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromActions from '../../store/actions';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  constructor(private store: Store<fromStore.MoviesState>) {
  }

  public ngOnInit(): void {
  }

  public start(): void {
    this.store.dispatch(new fromActions.MoviesStart());
  }

}
