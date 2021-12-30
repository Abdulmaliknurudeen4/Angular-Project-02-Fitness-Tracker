import {Component, OnDestroy, OnInit} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {TrainingService} from "../training.service";
import {Subscription} from "rxjs";
import {Exercise} from "../../exercise.model";
import {StopTrainingComponent} from "./stop-training/stop-training.component";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  timer: number | undefined;
  selectedExercise: Exercise | any;
  private trainSub: Subscription | undefined;

  constructor(private trainingSl: TrainingService,
              private dialog: MatDialog) {
    this.selectedExercise = null;
  }

  ngOnInit() {

    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    if (this.trainingSl.getRunningExercise() != null){
      // @ts-ignore
      const step = this.trainingSl.getRunningExercise().duration / 100 * 1000;
      this.timer = setInterval(()=>{
        this.progress = this.progress + 1;
        if(this.progress >= 100){
          this.trainingSl.completeExercise();
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
        this.trainingSl.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.trainSub)
      this.trainSub.unsubscribe();
  }
}
