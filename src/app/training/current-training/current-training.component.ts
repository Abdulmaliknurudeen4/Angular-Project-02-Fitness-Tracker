import {Component, Inject, OnDestroy, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StopTrainingComponent} from "./stop-training/stop-training.component";
import {TrainingService} from "../training.service";
import {Subscription} from "rxjs";
import {Exercise} from "../../exercise.model";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  timer: number | undefined;
  private trainSub: Subscription | undefined;
  selectedExercise: Exercise | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) private dialog: MatDialog,
              private trainingSl: TrainingService) {
  }

  ngOnInit() {
    this.trainSub = this.trainingSl.exerciseChanged
      .subscribe(value => {
        if(value){
          this.selectedExercise = value;
          this.startOrResumeTimer();
        }
      });
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, this.selectedExercise?.duration);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: 34
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingSl.exerciseChanged.next(null);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  ngOnDestroy(): void {
    if(this.trainSub)
      this.trainSub.unsubscribe();
  }
}
