import {Component, OnDestroy, OnInit} from '@angular/core';
import {Exercise} from "../../exercise.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {TrainingService} from "../training.service";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: Exercise[] = [];

  private exerciseSubscription: Subscription | undefined;
  isLoading: boolean = false;

  constructor(private trainingSl: TrainingService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.trainingSl.fetchAvailableExercise();
    this.exerciseSubscription =
      this.trainingSl.exercisesChanged
        .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.isLoading = false;
        });
  }

  onSubmit(form: NgForm) {
    this.trainingSl.startExercise(form.value.selectedExercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();
  }
}
