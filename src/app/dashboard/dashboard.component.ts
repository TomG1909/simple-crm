import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {


  constructor(public calendar: CalendarService) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.calendar.render()
    });

  }






}
