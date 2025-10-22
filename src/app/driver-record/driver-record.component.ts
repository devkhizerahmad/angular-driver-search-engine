import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { MatDateFormats, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';
import { Driver, DriverdataService } from '../services/driverdata.service';
import { Router } from '@angular/router';


export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString().padStart(2, '0');
      let month: string = (date.getMonth() + 1).toString().padStart(2, '0');
      let year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return date.toDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};
export class DatepickerMinMaxExample {

}

@Component({
  selector: 'app-driver-record',
  templateUrl: './driver-record.component.html',
  styleUrls: ['./driver-record.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class DriverRecordComponent implements OnInit {
  maxDate: Date;
  Form!: FormGroup;
  countryList: any[] = [];
  filteredDrivers: any[] = [];
  driversJasonRecord: Driver[] = [];
  isNewRecord: boolean = true;
  appendId: boolean = false;
  truckActive: boolean = false;
  //newDriverId: number = 1;

  constructor(private fb: FormBuilder, private countryService: CountryService, private driverService: DriverdataService,
    private router: Router

  ) {
    this.maxDate = new Date(2000, 11, 31);

    this.countryList = this.countryService.getDataOfAllCountriesList();
    console.log("country list", this.countryList);
    this.Form = this.fb.group({
      id: [null],
      nationality: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      identity_check: [false]
    });
  }
  ngOnInit(): void {

    this.driverService.getDrivers().subscribe((data: any[]) => {
      this.driversJasonRecord = data.map(driver => ({
        ...driver,
        id: Number(driver.id)
      }));
    });
    this.Form.get('search_driver_record')?.valueChanges.subscribe(value => {
      console.log("driverrecord enter :", value);

    });


    this.toggleNewRecord(true);
    this.Form.valueChanges.subscribe(value => {
      const searchValueName = value['search_driver_record']?.toLowerCase() || "";
      console.log(searchValueName);

      if (searchValueName) {
        this.filteredDrivers = this.driversJasonRecord.filter(d =>
          (d.first_name + " " + d.second_name).toLowerCase()
            .includes(searchValueName)
        );
        if (this.filteredDrivers.length === 0) {
          this.filteredDrivers.push({ driver_id: { first_name: '', second_name: '' }, isNew: true });
        }
      } else {
        this.filteredDrivers = [...this.driversJasonRecord];
      }
    });
  }

  onTruckActive() {
    this.truckActive = true
    console.log("truck record active");

  }

  toggleNewRecord(value: boolean) {
    this.isNewRecord = value;
    console.log("New driver toggle :", this.isNewRecord);
    this.applyFormControls();
  }
  onClearDate() {
    this.Form.get('date_of_birth')?.setValue(null);
  }

  applyFormControls() {
    this.Form.reset();
    if (this.isNewRecord) {
      this.Form.addControl('first_name', new FormControl('', Validators.required));
      this.Form.addControl('second_name', new FormControl('', Validators.required));
      this.Form.get('identity_check')?.setValue(false);
    } else {
      this.Form.addControl('driver_id', new FormControl('', Validators.required));
      if (this.Form.get('first_name')) { this.Form.removeControl('first_name'); }
      if (this.Form.get('second_name')) { this.Form.removeControl('second_name'); }
    }
  }


  onChange(eventvalue: string) {
    console.log(eventvalue);
  }

  appendDriverId(value: any) {
    if (value?.isNew) {

      const searchValue = this.Form.get('search_driver_record')?.value || "";
      const parts = searchValue.trim().split(" ");
      const firstName = parts[0] || "";
      const secondName = parts.length > 1 ? parts.slice(1).join(" ") : "";

      this.isNewRecord = true;
      this.appendId = false;
      this.applyFormControls();

      this.Form.patchValue({
        first_name: firstName,
        second_name: secondName,
        identity_check: false
      });
      console.log("first name  :", firstName, "second name  :", secondName);
    }
    else if (value) {
      console.log();


      this.Form.get('identity_check')?.setValue(true);
      //console.log("check in 2nd if", value);

      this.Form.patchValue({
        nationality: value.nationality,
        date_of_birth: value.date_of_birth,
      });

    }
  }
  activeNameRecords() {

    this.appendId = true;
    if (this.appendId) {
      this.Form.addControl('search_driver_record',
        new FormControl(''));
    }
    this.filteredDrivers = [...this.driversJasonRecord];
  }

  onSubmit() {
    if (this.Form.valid) {

      if (this.isNewRecord) {
        //console.log("New driver payload ", this.Form.getRawValue());

        const formValue = this.Form.value;

        const lastIndex = this.driversJasonRecord.length - 1;
        let newDriverId = 0;

        if (lastIndex >= 0) {
          newDriverId = Number(this.driversJasonRecord[lastIndex].id) + 1;
          //newDriverId = lastId + 1;
        }

        console.log("new id to insert", newDriverId);

        const driverToSave = {
          id: newDriverId,
          first_name: formValue.first_name,
          second_name: formValue.second_name,
          nationality: formValue.nationality,
          date_of_birth: formValue.date_of_birth,
          identity_check: formValue.identity_check
        };

        console.log("driver to save :", driverToSave);

        this.driverService.addDriver(driverToSave).subscribe({
          next: () => {
            console.log('Driver ADDED successfully!');
          },
          error: (err) => {
            console.error(err);
            //alert('Error adding driver');
          }
        });

      } else {
        console.log("Existing driver submit")

        const UpdatedFormValue = this.Form.value;
        const driverId = Number(UpdatedFormValue.driver_id?.id);

        const driverSendForUpdate = {
          id: Number(UpdatedFormValue.driver_id.id),
          first_name: UpdatedFormValue.driver_id.first_name,
          second_name: UpdatedFormValue.driver_id.second_name,
          nationality: UpdatedFormValue.nationality,
          date_of_birth: UpdatedFormValue.date_of_birth,
          identity_check: UpdatedFormValue.identity_check
        };

        //console.log("UpdatedFormValue :",UpdatedFormValue);

        console.log("Driver for Update :", driverSendForUpdate);
        console.log(this.driversJasonRecord);

        this.driverService.updateDriver(driverId, driverSendForUpdate).subscribe({
          next: () => {
            console.log('Driver UPDATED successfully!');
          },
          error: (err) => {
            console.error(err);
          }
        });

      }
      this.Form.reset();
      this.filteredDrivers = [...this.driversJasonRecord];
      //console.log(this.Form.controls);
    } else {
      alert("Fill all the fields");
      console.log("Form in invalid");

    }
  } showRecord() {
    this.router.navigate(['/DriverRecord']);
  }
}