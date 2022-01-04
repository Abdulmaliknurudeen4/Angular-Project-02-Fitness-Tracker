import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {Exercise} from "../../exercise.model";
import {NgForm} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import * as TrainingSelector from '../store/training.selector';
import * as TrainingActions from '../store/training.actions';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises$: Observable<Exercise[]> = new Observable<Exercise[]>();
  isLoading$: boolean = false;

  constructor(private store: Store) {
    this.availableExercises$ = new Observable<Exercise[]>();
  }

  ngOnInit() {
    this.store.dispatch(TrainingActions.FETCH_AVAL_EXERCISES());

    this.store.select(TrainingSelector.selectTrainingViewPageModel).pipe(map(trainingState => {
      return !!trainingState.isLoading;
    })).subscribe(value => {
      this.isLoading$ = value;
    });

    this.availableExercises$ = this.store
      .select(TrainingSelector.selectTrainingViewPageModel)
      .pipe(map(trainingState => trainingState.availabeEx), map((value: Exercise[]) => {
        return value;
      }));

  }

  onSubmit(form: NgForm) {
    this.store.dispatch(TrainingActions.SET_RUNNING_EXERCISE({payload: form.value.selectedExercise}));
  }

}
