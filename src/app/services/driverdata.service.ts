import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Driver {
  id: Number;
  first_name: string;
  second_name: string;
  nationality: string;
  date_of_birth: string;
  identity_check: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DriverdataService {
  private driversRecordApiUrl = 'http://localhost:3000/drivers';

  constructor(private https: HttpClient) { }

  getDrivers(): Observable<Driver[]> {
    return this.https.get<Driver[]>(this.driversRecordApiUrl);
  }

  addDriver(driver: Driver): Observable<Driver> {
    console.log("post driver in db :", driver);

    return this.https.post<Driver>(this.driversRecordApiUrl, driver);
  }
  updateDriver(id: number, driverData: Driver) {
    console.log("id", id, "driverdata ser :", driverData);

    return this.https.put<Driver>(this.driversRecordApiUrl + '/' + id, driverData);
  }


}
