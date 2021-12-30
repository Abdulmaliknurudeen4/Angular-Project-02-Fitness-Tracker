import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Exercise} from "../../exercise.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {TrainingService} from "../training.service";

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

  constructor(private trainingSl: TrainingService) { }

  ngOnInit() {
    this.dataSource.data =
      this.trainingSl.getCompletedOrCancelledExercises();
  }

  doFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    if(this.sort && this.paginator){
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }
}
