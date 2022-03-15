import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime()
    this.loading = true;
    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('added user', result)
        this.dialogRef.close()
      })
  }

}
