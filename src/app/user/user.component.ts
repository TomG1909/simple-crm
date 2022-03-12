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
  AllUsers = [];
  user = new User();

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Received from DB', changes)
        this.AllUsers = changes;
      })
  }
  openDialog() {
    this.dialog.open(DialogUserComponent)
  }
}
