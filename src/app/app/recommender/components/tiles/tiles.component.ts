import {Component, OnInit} from '@angular/core';
import {ConfigModel} from '../../../../models';
import * as fromSelectors from '../../../../store/selectors';
import * as fromStore from '../../../../store';
import * as fromActions from '../../../../store/actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
  public optionSelected: boolean;
  public options: ConfigModel[];
  public currentStep: ConfigModel;

  constructor(private store: Store<fromStore.MoviesState>) {
  }

  public ngOnInit(): void {
    this.optionSelected = false;

    this.store.select(fromSelectors.getCurrentStep).subscribe((step) => {
      if (step) {
        this.options = step.children;
      }
      this.currentStep = step;
    });
  }

  public selectAnswer(answerNodeId): void {
    this.store.dispatch(new fromActions.MoviesNextStep(answerNodeId));
  }

}
