import * as TrainingReducer from '../store/training.reducer';
import {createSelector} from "@ngrx/store";

export const selectTrainingViewPageModel = createSelector(
  TrainingReducer.trainingFeature.selectAvailabeExercise,
  TrainingReducer.trainingFeature.selectCompletedOrFinishedExercises,
  TrainingReducer.trainingFeature.selectRunningExercise,
  TrainingReducer.trainingFeature.selectIsLoadingExercise,
  (availabeEx, cc_Exer, runningEx, isLoading) => ({availabeEx, cc_Exer, runningEx, isLoading})
);
