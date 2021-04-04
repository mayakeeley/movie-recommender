import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subject, Subscription} from 'rxjs';
import * as fromSelectors from '../../../../store/selectors';
import {QuestionModel} from '../../../../models';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../../store';
import * as fromActions from '../../../../store/actions';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.scss']
})
export class RecommenderComponent implements OnInit, OnDestroy {
  public isFirstRoute: boolean;
  public stepData: QuestionModel;
  public recommenderPath = 'recommender';
  private subs: Subscription[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<fromStore.MoviesState>, private router: Router) {
    this.router.events.subscribe((event: any) => {
      // If someone navigates here again whilst they're already here
      // i.e. they click a robot builder link. If they do that we re-init
      // the journey.
      if (event instanceof NavigationEnd) {
        this.initRecommender();
      }
    });
  }

  public ngOnInit(): void {
    this.subs.push(
      combineLatest(this.store.select(fromSelectors.getCurrentStep), this.store.select(fromSelectors.getStepNumber)).subscribe(
        ([currentStep, stepNumber]) => {
          this.isFirstRoute = stepNumber === 0;
          this.stepData = currentStep?.data as QuestionModel;
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  public back(): void {
    this.store.dispatch(new fromActions.MoviesPrevStep());
  }

  public initRecommender(): void {
    const page = this.router.url.match(/.*\/([^?]+)/);
    const path = page[page.length - 1];
    if (path === this.recommenderPath) {
      this.subs.push(
        this.store.select(fromSelectors.getCurrentStep).subscribe((currentStep) => {
          if (currentStep) {
            const currentPath = currentStep.nodeId;

            this.store.dispatch(
              new fromActions.MoviesNavigate({
                path: [`/recommender/${currentPath}`],
              })
            );
          }
        })
      );
    }
  }

}
