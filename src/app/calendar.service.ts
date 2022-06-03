import { Injectable, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';


import { Observable } from 'rxjs';

import { EventDialogComponent } from './event-dialog/event-dialog.component';


@Injectable({
  providedIn: 'root'
})



export class CalendarService {
  newEvent!: Observable<any>;
  events: any = [
    {
      title: 'event1',
      start: '2022-06-01'
    }
  ];

  title: string = '';
  start: any = '';



  constructor(public dialog: MatDialog, public firestore: AngularFirestore, public dialogRef: MatDialogRef<EventDialogComponent>) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    displayEventTime: false,
    eventDisplay: 'block',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: this.events,


  };


  handleDateClick(arg: any) {

    this.openDialog();
    console.log(arg.dateStr)
  }

  addEvent() {
    const newEvent = {
      title: this.title,
      start: this.start.toISOString()

    }
    //this.events.push(newEvent)
    this.saveEventToFirebase(newEvent);

    console.log('Array', this.events)


  }


  saveEventToFirebase(event: any) {
    const id = this.firestore.createId();
    this.firestore.collection('events').doc(id).set(event)

  }

  openDialog() {
    this.dialog.open(EventDialogComponent)
  }



  loadEventFromFirebase() {
    return this.firestore.collection('events').valueChanges();



  }

}

