import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombinedDashboardComponent } from '../seg-main-component/sarar-dashboard/sarar-dashboard.component';

@Component({
  selector: 'app-seg-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CombinedDashboardComponent
  ],
  templateUrl: './seg-dashboard.component.html',
  styleUrls: ['./seg-dashboard.component.css']
})
export class SegDashboardComponent implements OnInit {
  currentDate: string = '';

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

}
