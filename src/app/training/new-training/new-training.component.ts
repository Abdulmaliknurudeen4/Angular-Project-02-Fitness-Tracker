import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../exercise.model";
import {NgForm} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Observable<Exercise[]> = new Observable<Exercise[]>();
  private itemsCollection : AngularFirestoreCollection<Exercise>;
  constructor(private fireDb: AngularFirestore) {
    this.itemsCollection = fireDb.collection<Exercise>('availableExercises');
  }

  ngOnInit() {
    this.availableExercises =
        this.itemsCollection
          .snapshotChanges()
          .pipe(map(documentArray => {

            return documentArray.map( doc =>{
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: +doc.payload.doc.data().duration,
                calories: +doc.payload.doc.data().calories,
                imgPath: doc.payload.doc.data().imgPath
              };
            } );

          }))
  }

  onSubmit(form: NgForm) {
    // this.trainingSl.startExercise(form.value.selectedExercise);
  }
}
