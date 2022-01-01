import {NgModule} from "@angular/core";
import {SharedModule} from "../shared.module";
import {TrainingComponent} from "./training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {RouterModule} from "@angular/router";
import {StopTrainingComponent} from "./current-training/stop-training/stop-training.component";

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [SharedModule,
    RouterModule.forChild([
      {path: '', component: TrainingComponent}
    ])],
  exports: [RouterModule],
  providers: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
