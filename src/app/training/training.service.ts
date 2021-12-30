import {Injectable} from '@angular/core';
import {Exercise} from "../exercise.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 10},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 9},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];
  exerciseChanged = new Subject<Exercise | null>();
  private runningExercise: Exercise | undefined | null;
  private exercises: Exercise[] = [];

  constructor() {
  }

  getAvailableExercise() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises
      .find(ex => ex.id == selectedId);
    if (this.runningExercise)
      this.exerciseChanged.next({...this.runningExercise});
    return this.runningExercise;
  }

  getRunningExercise() {
    if (this.runningExercise)
      return {...this.runningExercise};
    return null;
  }

  completeExercise() {
    if (this.runningExercise)
      this.exercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: "Completed"
      })
  }

  cancelExercise(progress: number) {
    if (this.runningExercise)
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: "Cancelled"
      });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
