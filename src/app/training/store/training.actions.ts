import {createAction, props} from "@ngrx/store";
import {Exercise} from "../../exercise.model";

export const FETCH_AVAL_EXERCISES = createAction('[Training-Section] FETCH_AVAILABLE_EXERCISES');
export const SET_AVAL_EXERCISES = createAction('[Training-Section] SET_AVAILABLE_EXERCISES', props<{payload: Exercise[]}>());
export const FETCH_CC_EXERCISES = createAction('[Training-Section] FETCH_COMPLETEDCANCELLED_EXERCISES');
export const SET_CC_EXERCISES = createAction('[Training-Section] SET_COMPLETEDCANCELLED_EXERCISES', props<{payload: Exercise[]}>());
export const FINISHED_EXERCISE = createAction('[Training-Section] FINISHED_EXERCISE');
export const CLEAR_RUNNING_EXERCISE = createAction('[Training-Section] CLEAR_RUNNING_EXERCISE');
// the payload here is the progress
export const CANCEL_EXERCISE = createAction('[Training-Section] CANCEL_EXERCISE', props<{payload: number}>());
//  the payload here is oftype string the id of the exercise that will be taken from the available exercises.
export const SET_RUNNING_EXERCISE = createAction('[Training-Section] SET_RUNNING_EXERCISE', props<{payload: string}>());

//  FINISHED OR CANCEL RUNNING EXERCISE SHALL NOT BE CALLED IN THE REDUCER , THEY ARE USED IN THE EFFECTS
//  the effects take finished exercise actions and gets the running exercise and updates it to the database and dispatches clear running exercise which sets
//   running exercise to null, same for cancel exercise excepts that it calculates the progress and calories burnt and does the same
