import {Component, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {Exercise} from "../../exercise.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Exercise[] = [];

  constructor(private trainingSl: TrainingService) {
  }

  ngOnInit() {
    this.availableExercises =
      this.trainingSl.availableExercises;
  }

  onSubmit(form: NgForm) {
    this.trainingSl.startExercise(form.value.selectedExercise);
  }
}
