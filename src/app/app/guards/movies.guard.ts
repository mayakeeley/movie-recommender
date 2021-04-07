import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {combineLatest, Observable, of} from 'rxjs';
import * as fromSelectors from '../../store/selectors';
import {filter, switchMap, tap} from 'rxjs/operators';
import * as fromActions from '../../store/actions';
import {NodeTypesEnum} from '../../enums';
import {TilesComponent} from '../recommender/components/tiles/tiles.component';
import {ResultsComponent} from '../recommender/components/results/results.component';

@Injectable({
  providedIn: 'root',
})
export class MoviesGuard implements CanActivateChild {
  public routes;
  public config = [];
  private firstInit = true;

  constructor(private router: Router, private store: Store<fromStore.MoviesState>) {
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(this.store.select(fromSelectors.getCurrentStep)).pipe(
      tap(([currentStep]) => {
        if (!currentStep) {
          this.store.dispatch(new fromActions.MoviesStart());
        }
      }),
      filter(([currentStep]) => !!currentStep),
      switchMap(([currentStep]) => {
        this.routes = [];
        const step = currentStep.nodeId;
        if (this.firstInit) {
          this.createRoute(currentStep);
          this.updateRoutes();
          this.store.dispatch(
            new fromActions.MoviesNavigate({
              path: [`recommender/${step}`],
            })
          );
        }

        this.firstInit = false;
        return of(true);
      })
    );
  }

  public createRoute(step): void {
    if (step.nodeType === NodeTypesEnum.question) {
      this.routes.push({
        path: step.nodeId,
        component: TilesComponent,
      });
    }
    if (step.nodeType === NodeTypesEnum.results) {
      this.routes.push({
        path: step.nodeId,
        component: ResultsComponent,
      });
    }
  }

  public updateRoutes(): void {
    const recommenderIndex = this.router.config.findIndex(route => {
      return route.path === 'recommender';
    });
    this.router.config[recommenderIndex].children = this.routes;
  }
}
