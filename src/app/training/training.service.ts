import {Injectable} from '@angular/core';
import {Exercise} from "../exercise.model";
import {map, Subject} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  availableExercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged: Subject<Exercise[]>;
  finishedExercisesChanged: Subject<Exercise[]>;
  private runningExercise: Exercise | undefined | null;
  private itemsCollection: AngularFirestoreCollection<Exercise>;
  private finishedCollection: AngularFirestoreCollection<Exercise>;

  constructor(private fireDb: AngularFirestore) {
    this.exercisesChanged = new Subject<Exercise[]>();
    this.finishedExercisesChanged = new Subject<Exercise[]>();
    this.itemsCollection = this.fireDb.collection<Exercise>('availableExercises');
    this.finishedCollection = this.fireDb.collection<Exercise>('finishedExercises');
  }

  fetchAvailableExercise() {
    this.itemsCollection
      .snapshotChanges()
      .pipe(map(documentArray => {

        return documentArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: +doc.payload.doc.data().duration,
            calories: +doc.payload.doc.data().calories,
            imgPath: doc.payload.doc.data().imgPath
          };
        });

      })).subscribe((exercises: Exercise[]) => {
      console.log(exercises);
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    });
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
    if (this.runningExercise) {
      this.addFinishedExercise({
        ...this.runningExercise,
        date: new Date(),
        state: "Completed"
      });
    }

    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.addFinishedExercise({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: "Cancelled"
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  fetchCompletedOrCancelledExercises() {
    this.finishedCollection.valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      });
  }

  private addFinishedExercise(exercise: Exercise) {
    this.finishedCollection
      .add(exercise);
  }
}
