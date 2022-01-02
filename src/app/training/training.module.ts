import {NgModule} from "@angular/core";
import {SharedModule} from "../shared.module";
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {RouterModule} from "@angular/router";
import {StopTrainingComponent} from "./current-training/stop-training/stop-training.component";
import {StoreModule} from "@ngrx/store";
import * as TrainingFeature from './store/training.reducer';
import {EffectsModule} from "@ngrx/effects";
import {TrainingEffects} from "./store/training.effects";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [SharedModule,
    RouterModule.forChild([{path: '', component: TrainingComponent}]),
    StoreModule.forFeature(TrainingFeature.trainingFeature),
    EffectsModule.forFeature([TrainingEffects])
  ],
  exports: [RouterModule],
  providers: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
