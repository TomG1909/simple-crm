import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarOptions, EventInput } from '@fullcalendar/angular';
import { collectionData } from 'rxfire/firestore';

import { Observable } from 'rxjs';

import { EventDialogComponent } from './event-dialog/event-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  newEvent!: Observable<any>;
  events: Array<any> = [
    { title: 'event 1', date: '2022-05-16' },
    { title: 'event 2', date: '2022-05-10' },

  ];

  title: string = '';
  date: string = '';


  constructor(public dialog: MatDialog, public firestore: AngularFirestore) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.events,


  };



  handleDateClick(arg: any) {

    this.openDialog();
    console.log(arg.dateStr)
  }

  addEvent() {

    this.events.push({
      title: this.title,
      date: this.date

    })
    this.saveEventToFirebase();





  }
  saveEventToFirebase() {
    const id = this.firestore.createId();
    this.firestore.collection('events').doc(id).set({
      title: this.title,
      date: this.date
    }).then((values) => this.events.push(values))



    this.loadEventFromFirebase()
    console.log(this.events)

  }

  openDialog() {
    this.dialog.open(EventDialogComponent)
  }



  loadEventFromFirebase() {
    this.newEvent = this.firestore.collection('events').valueChanges();
    this.newEvent.subscribe((newEvents) => {
      this.events = newEvents;


    })



  }

}

