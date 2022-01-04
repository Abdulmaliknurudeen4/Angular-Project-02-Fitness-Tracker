import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as TrainingSelector from './store/training.selector';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean> = new Observable<boolean>();

  constructor(private store: Store) {

  }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(TrainingSelector.selectTrainingViewPageModel)
      .pipe(map(trainingState => trainingState.runningEx), map(runningExec => {
        return !!runningExec;
      }));
  }

}
