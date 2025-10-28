import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombinedDashboardComponent } from '../hitu-main-component/sarar-dashboard/sarar-dashboard.component';

@Component({
  selector: 'app-hitu-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CombinedDashboardComponent
  ],
  templateUrl: './hitu-dashboard.component.html',
  styleUrls: ['./hitu-dashboard.component.css']
})
export class HituDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
