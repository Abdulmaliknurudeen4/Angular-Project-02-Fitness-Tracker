import {Component, OnInit} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {map} from "rxjs";
import {Exercise} from "../../exercise.model";
import {StopTrainingComponent} from "./stop-training/stop-training.component";
import * as TrainingSelector from '../store/training.selector';
import * as TrainingActions from '../store/training.actions';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number | undefined;
  selectedExercise: Exercise | any;

  constructor(private dialog: MatDialog,
              private store: Store) {
    this.selectedExercise = null;
  }

  ngOnInit() {
    this.store.select(TrainingSelector.selectTrainingViewPageModel)
      .pipe(map(trainingState => trainingState.runningEx))
      .subscribe(runningExercise => {
        this.selectedExercise = runningExercise;
      })
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    if (this.selectedExercise != null) {
      // @ts-ignore
      const step = this.selectedExercise.duration / 100 * 1000;
      // @ts-ignore
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.store.dispatch(TrainingActions.FINISHED_EXERCISE());
          clearInterval(this.timer);
        }
      }, step);
    }
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(TrainingActions.CANCEL_EXERCISE({payload: this.progress}));
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
