import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrainingService} from "./training.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  private readonly trainingSubscription: Subscription | undefined;

  constructor(private trainingService: TrainingService) {
    this.trainingSubscription = this.trainingService
      .exerciseChanged.subscribe(exer=>{
        if(!!exer){
          this.ongoingTraining = true;
        }else{
          this.ongoingTraining = false;
        }
      });
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    if(this.trainingSubscription)
      this.trainingSubscription.unsubscribe();
  }
}
