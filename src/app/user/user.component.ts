import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  AllUsers: any;
  user = new User();

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'costumIdName' })
      .subscribe((changes: any) => {
        console.log('Received from DB', changes)
        this.AllUsers = changes;
      })
  }
  openDialog() {
    this.dialog.open(DialogUserComponent)
  }
  deleteFromFirestore(id: any) {
    this.firestore.collection('users').doc(id).delete();
    setTimeout(() => {
      location.pathname = 'user/'
    }, 100);

  }

}
