import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Event } from 'src/models/event.class';
import { CalendarService } from '../calendar.service';
import { CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('calendarComponent')
  calendarComponent!: FullCalendarComponent;

  constructor(public calendar: CalendarService) { }
  ngAfterViewInit(): void {

    this.calendar.loadEventFromFirebase()
      .subscribe((newEvents: any) => {

        //this.events = newEvents
        console.log('loaded events', newEvents)

        const calendarAPI = this.calendarComponent.getApi();

        calendarAPI.addEventSource(newEvents)

        calendarAPI.render()





      })

  }
  ngOnInit(): void {




  }






}
