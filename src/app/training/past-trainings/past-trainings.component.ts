import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Exercise} from "../../exercise.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {map, tap} from "rxjs";
import {Store} from "@ngrx/store";
import * as TrainingSelector from '../store/training.selector';
import * as TrainingActions from '../store/training.actions';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(TrainingActions.FETCH_CC_EXERCISES());
    this.store.select(TrainingSelector.selectTrainingViewPageModel)
      .pipe(map(trainingState => trainingState.cc_Exer))
      .subscribe(ccExercises => {
        this.dataSource.data = ccExercises;
      })
  }

  doFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    if (this.sort && this.paginator) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

}
