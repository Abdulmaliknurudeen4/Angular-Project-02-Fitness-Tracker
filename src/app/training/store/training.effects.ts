import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Store} from "@ngrx/store";
import {Exercise} from "../../exercise.model";
import * as TrainingSelector from './training.selector';
import * as TrainingActions from './training.actions';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from "rxjs";

@Injectable()
export class TrainingEffects {


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


  private finishedCollection: AngularFirestoreCollection<Exercise>;
  private availableCollection: AngularFirestoreCollection<Exercise>;

  constructor(private fireDb: AngularFirestore,
              private store: Store,
              private actions$: Actions) {
    this.availableCollection = this.fireDb.collection<Exercise>('availableExercises');
    this.finishedCollection = this.fireDb.collection<Exercise>('finishedExercises');
    this.store.select(TrainingSelector.selectTrainingViewPageModel).pipe();
  }

}
