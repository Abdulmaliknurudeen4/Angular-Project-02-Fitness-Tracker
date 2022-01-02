import {Exercise} from "../../exercise.model";
import * as TrainingActions from '../store/training.actions';
import {createFeature, createReducer, on} from "@ngrx/store";
import {CLEAR_RUNNING_EXERCISE} from "../store/training.actions";

export interface State {
  availabeExercise: Exercise[];
  completedOrFinishedExercises: Exercise[];
  runningExercise: Exercise | null;
  isLoadingExercise: boolean;
}

const initialState: State = {
  availabeExercise: [],
  completedOrFinishedExercises: [],
  runningExercise: null,
  isLoadingExercise: false
}

export const trainingFeature =createFeature({name: 'training', reducer: createReducer(initialState,
    on(TrainingActions.FETCH_AVAL_EXERCISES, (state, action)=>{
      return{
        ...state,
        isLoadingExercise: true
      };
    }),
    on(TrainingActions.SET_AVAL_EXERCISES, (state, action)=>{
      return{
        ...state,
        isLoadingExercise: false,
        availabeExercise: {...action.payload}
      };
    }),
    on(TrainingActions.SET_CC_EXERCISES, (state, action)=>{
      return{
        ...state,
        completedOrFinishedExercises: {...action.payload}
      };
    }),
    on(TrainingActions.SET_RUNNING_EXERCISE, (state, action)=>{
      const runningExercise = state.availabeExercise.find(ex=>ex.id === action.payload);
      if(runningExercise)
        return{
          ...state,
          runningExercise: {...runningExercise}
        };
      return {
        ...state,
        runningExercise: null
      };
    }),
    on(TrainingActions.CLEAR_RUNNING_EXERCISE, (state, action)=>{
      return{
        ...state,
        runningExercise: null
      };
    })
    )});
