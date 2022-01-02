import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Store} from "@ngrx/store";
import {Exercise} from "../../exercise.model";
import * as TrainingSelector from './training.selector';
import * as TrainingActions from './training.actions';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map, switchMap} from "rxjs";

@Injectable()
export class TrainingEffects {


  private finishedCollection: AngularFirestoreCollection<Exercise>;
  private availableCollection: AngularFirestoreCollection<Exercise>;

  fetchCompletedCancelledExercises = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrainingActions.FETCH_CC_EXERCISES),

      // switch or exhaustMap
      switchMap(() => {
        return this.finishedCollection.snapshotChanges().pipe(
          map(documentArray => {
            return documentArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: +doc.payload.doc.data().duration,
                calories: +doc.payload.doc.data().calories,
                imgPath: doc.payload.doc.data().imgPath
              };
            });

          }));
      }),
      map(value => {
        return TrainingActions.SET_CC_EXERCISES({payload: value})
      })
    );
  }, {dispatch: true});
  finishedExercise = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(TrainingActions.FINISHED_EXERCISE),
        exhaustMap(() => this.store.select(TrainingSelector.selectTrainingViewPageModel).pipe(map(trainingState => trainingState.runningEx))),
        map(runningExercise => {
          if (runningExercise) {
            // manipulation
            this.finishedCollection.add({
              ...runningExercise,
              date: new Date(),
              state: "Completed"
            });
            return TrainingActions.CLEAR_RUNNING_EXERCISE();
          } else {
            return ({type: 'DUMMY'});
          }
        })
      );
  }, {dispatch: true});
  cancelExercise = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(TrainingActions.CANCEL_EXERCISE),
        exhaustMap(payload => {
          return this.store.select(TrainingSelector.selectTrainingViewPageModel)
            .pipe(map(trainingState => trainingState.runningEx),
              map(runningExerciseEdit => {
                if (runningExerciseEdit)
                  return {
                    ...runningExerciseEdit,
                    duration: runningExerciseEdit.duration * (payload.payload / 100),
                    calories: runningExerciseEdit.calories * (payload.payload / 100)
                  };
                return runningExerciseEdit;
              }))
        }),
        map(runningExercise => {
          if (runningExercise) {
            this.finishedCollection.add({
              ...runningExercise,
              date: new Date(),
              state: "Cancelled"
            });
            return TrainingActions.CLEAR_RUNNING_EXERCISE();
          } else {
            return ({type: 'DUMMY'});
          }
        })
      );
  }, {dispatch: true});
  fetchAvailabeExercises = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrainingActions.FETCH_AVAL_EXERCISES),

      // switch or exhaustMap
      switchMap(() => {
        return this.availableCollection.snapshotChanges().pipe(
          map(documentArray => {
            return documentArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: +doc.payload.doc.data().duration,
                calories: +doc.payload.doc.data().calories,
                imgPath: doc.payload.doc.data().imgPath
              };
            });

          }));
      }),
      map(value => {
        return TrainingActions.SET_AVAL_EXERCISES({payload: value})
      })
    );
  }, {dispatch: true});

  constructor(private fireDb: AngularFirestore,
              private store: Store,
              private actions$: Actions) {
    this.availableCollection = this.fireDb.collection<Exercise>('availableExercises');
    this.finishedCollection = this.fireDb.collection<Exercise>('finishedExercises');
    this.store.select(TrainingSelector.selectTrainingViewPageModel).pipe();
  }

}
