import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { Chart, ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Event } from 'src/models/event.class';
import { CalendarService } from '../calendar.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(public calendar: CalendarService) { }


  ngOnInit(): void {


    this.calendar.loadEventFromFirebase();
  }




}
