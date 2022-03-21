import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  user: any = User
  loading = false;
  userId: string | undefined;
  constructor(public dialogRef: MatDialogRef<EditAddressComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();

  }

  saveUser() {

    this.loading = true;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update(this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      });

  }
}


