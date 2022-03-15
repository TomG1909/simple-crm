import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: any = '';
  user: any = {};

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = user
        console.log('retrieved user', this.user)

      })
  }

}
