import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subject, Subscription} from 'rxjs';
import * as fromSelectors from '../../../../store/selectors';
import {ConfigModel} from '../../../../models';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../../store';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.scss']
})
export class RecommenderComponent implements OnInit, OnDestroy {
  public isFirstRoute: boolean;
  public step: ConfigModel;
  private subs: Subscription[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<fromStore.MoviesState>) {
  }

  public ngOnInit(): void {
    this.subs.push(
      combineLatest(this.store.select(fromSelectors.getCurrentStep), this.store.select(fromSelectors.getStepNumber)).subscribe(
        ([currentStep, stepNumber]) => {
          this.isFirstRoute = stepNumber === 0;
          this.step = currentStep;
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
