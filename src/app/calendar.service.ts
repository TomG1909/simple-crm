import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarOptions, EventClickArg, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { Observable } from 'rxjs';
import { EventDialogComponent } from './event-dialog/event-dialog.component';


@Injectable({
  providedIn: 'root'
})



export class CalendarService {
  calendarComponent!: FullCalendarComponent;
  newEvent!: Observable<any>;
  events: any = [

  ];

  title: string = '';
  start: any = '';
  eventsCollection: any;
  eventDoc: AngularFirestoreDocument | undefined;



  constructor(public dialog: MatDialog, public firestore: AngularFirestore, public dialogRef: MatDialogRef<EventDialogComponent>) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    displayEventTime: false,
    eventDisplay: 'block',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this),
    events: this.events,



  };

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }

    this.deleteEventFromFirestore(clickInfo.event.id)

    console.log(clickInfo.event.id)

  }

  handleDateClick(arg: any) {

    this.openDialog();
    console.log(arg.dateStr)
  }




  saveEvent() {
    const id = this.firestore.createId();

    const newEvent = {
      id: id,
      title: this.title,
      start: this.start.toISOString()

    }



    this.firestore.collection('events').doc(id).set(newEvent)

  }

  openDialog() {
    this.title = "";
    this.start = "";
    this.dialog.open(EventDialogComponent)
  }



  loadEventFromFirebase() {
    return this.firestore.collection('events').valueChanges({ idField: 'id' });

  }



  deleteEventFromFirestore(id: any) {
    this.firestore.collection('events').doc(id).delete();
  }

}

