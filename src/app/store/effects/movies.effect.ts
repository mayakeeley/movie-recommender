import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as fromActions from '../actions';
import {catchError, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {MoviesService} from '../../services/movies.service';
import {Store} from '@ngrx/store';
import {MoviesState} from '../reducers';
import {ConfigModel} from '../../models';
import {NodeTypesEnum} from '../../enums';
import {Router} from '@angular/router';
import {TilesComponent} from '../../app/recommender/components/tiles/tiles.component';
import {ResultsComponent} from '../../app/recommender/components/results/results.component';
import * as fromSelectors from '../selectors';

@Injectable()
export class MoviesEffect {
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

  @Effect()
  public nextStep$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_NEXT_STEP),
    map((action: fromActions.MoviesNextStep) => action.payload),
    withLatestFrom(
      this.store.select(fromSelectors.getCurrentStep),
      this.store.select(fromSelectors.getSteps),
    ),
    switchMap(([value, step, prevSteps]) => {
      return this.moviesService.getConfigData().pipe(
        switchMap(tree => {
          const nextStep = this.getNextStep(step, tree, value);
          const steps = prevSteps.concat(nextStep);

          this.addRoutes(steps);

          return [
            new fromActions.MoviesNextStepSuccess(nextStep),
            new fromActions.MoviesNavigate({
              path: [`recommender/${nextStep.nodeId}`]
            })
          ];
        }),
        catchError(error => of(new fromActions.MoviesNextStepFail(error)))
      );
    })
  );

  @Effect()
  public prevStep$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_PREV_STEP),
    withLatestFrom(this.store.select(fromSelectors.getSteps)),
    switchMap(([never, steps]) => {
      const prevStep = steps[steps.length - 2];
      if (prevStep) {
        return [
          new fromActions.MoviesPrevStepSuccess(prevStep),
          new fromActions.MoviesNavigate({
            path: [`recommender/${prevStep.nodeId}`]
          })
        ];
      }
    }),
    catchError(error => of(new fromActions.MoviesPrevStepFail(error)))
  );

  @Effect({dispatch: false})
  public navigate$ = this.actions$.pipe(
    ofType(fromActions.MOVIES_NAVIGATE),
    map((action: fromActions.MoviesNavigate) => action.payload),
    tap(({path, query: queryParams, extras}) => {
      this.router.navigate(path, {queryParams, ...extras});
    })
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store: Store<MoviesState>,
    private router: Router
  ) {
  }


  // look at improving this - must be a better way to do this
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
    const recommenderIndex = this.router.config.findIndex(route => {
      return route.path === 'recommender';
    });
    this.router.config[recommenderIndex].children = this.createRoutes(steps);
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

  private getNextStep(currentRoute, config, value): ConfigModel {
    // find the corresponding child answer
    const childNode = currentRoute.children.find(child => child.nodeId === value);

    // get the next question or preset node Id
    const nodeId = this.getNextNodeId(childNode);

    // find the node in the config and return the current step
    return this.getNodeById(config, nodeId);
  }

  private getNextNodeId(node): string {
    // check if node is a question or preset, if not, go to the next child and repeat until you find a question or preset
    let result = null;
    if (node.nodeType === NodeTypesEnum.results || node.nodeType === NodeTypesEnum.question) {
      return node.nodeId;
    } else {
      if (node.children) {
        result = this.getNextNodeId(node.children[0]);
      }
      return result;
    }
  }

  private getNodeById(tree, nodeId): ConfigModel {
    // traverse config tree until node id matches the node, return that as the current step
    let result = null;
    tree.forEach(node => {
      if (nodeId === node.nodeId) {
        result = this.getCurrentStep(node);
      } else if (!result) {
        if (node.children) {
          result = this.getNodeById(node.children, nodeId);
        }
      }
    });
    return result;
  }
}
