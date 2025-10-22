import { Component, OnInit } from '@angular/core';
import { Driver, DriverdataService } from 'src/app/services/driverdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'first_name',
    'second_name',
    'nationality',
    'date_of_birth',
    'identity_check'
  ];
  dataSource: any[] = [];

  constructor(private driverDataService: DriverdataService) { }

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverDataService.getDrivers().subscribe({
      next: (drivers) => {
        this.dataSource = drivers;
        console.log("Fetched Drivers:", this.dataSource);
      },
      error: (err) => {
        console.error("Error fetching drivers:", err);
      }
    });
  }
  clickedRows = new Set<Driver>();
}
