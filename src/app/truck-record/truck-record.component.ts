import { Component, OnInit } from '@angular/core';
import { TransportCategory, TankType, StuckgutType, TrailerOption } from './track-record';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-truck-record',
  templateUrl: './truck-record.component.html',
  styleUrls: ['./truck-record.component.scss']
})
export class TruckRecordComponent implements OnInit {

  transportCategory = TransportCategory;
  tankType = TankType;
  stuckgutType = StuckgutType;
  trailerOption = TrailerOption;

  activeTransportCategory: TransportCategory | null = null;
  activeTankType: TankType | null = null;
  activeStuckgutType: StuckgutType | null = null;
  activeTrailerOption: TrailerOption | null = null;

  lkw_select_input = new FormControl('');
  auflieger_select_input = new FormControl('');
  muldenNumber_select_input = new FormControl('');
  transporterGrp_select_input = new FormControl('');
  activeSubmitButton: boolean = false

  filteredTrains: any[] = [];
  filteredTrailers: any[] = [];
  filterTransports: any[] = [];
  filteredmuldenNumber: any[] = [];

  train: any[] = [
    { id: 0, viewValue: "LkW007" },
    { id: 1, viewValue: "LKBG456" },
    { id: 2, viewValue: "TLXF432" },
    { id: 3, viewValue: "EXBZ342" },
    { id: 4, viewValue: "RBFZ987" },
  ];
  trailer: any[] = [
    { id: 5, viewValue: "GTL763" },
    { id: 6, viewValue: "YNT352" },
    { id: 7, viewValue: "TRF773" },
    { id: 8, viewValue: "YUE541" },
    { id: 9, viewValue: "JWE431" },
  ];
  semiTrain: any[] = [
    { id: 100, viewValue: 'AUGLIFER PLANE' },
    { id: 101, viewValue: 'TRUCK NISSAN' },
    { id: 102, viewValue: 'JUKE VAN' },
  ];
  typ: any[] = [
    { id: 110, viewValue: 'Thermo' },
    { id: 111, viewValue: 'Nicht Thermo' },
  ];
  transPorters: any[] = [
    { id: 10, viewValue: 'DPH-BS-123' },
    { id: 11, viewValue: 'DFV-DF-4546' },
    { id: 12, viewValue: 'JUK-VA-345' },
  ];
  tractor: any[] = [
    { id: 13, viewValue: 'LKW GLIEDERZURG PLANE' },
    { id: 14, viewValue: 'LKW GLIEDERZURG KOOPER' },
    { id: 15, viewValue: 'LKW GLIEDERZURG CONTAINER' },
  ];
  muldenNumber: any[] = [
    { id: 16, viewValue: 'AUF007' },
    { id: 17, viewValue: 'tc-gh-12' },
    { id: 18, viewValue: 'df-ew-53' },
    { id: 19, viewValue: 'ks-we-45' },
  ];

  Form!: FormGroup;
  constructor(
    private fb: FormBuilder

  ) { }
  ngOnInit(): void {
    this.activeSubmitButton = false
    this.filteredTrains = this.train;
    this.filteredTrailers = this.trailer;
    this.filterTransports = this.transPorters;
    this.filteredmuldenNumber = this.muldenNumber;

    this.Form = this.fb.group({});

    const userData = localStorage.getItem('allUserData');

    if (userData) {
      const parsed = JSON.parse(userData);

      if (parsed.transport_mittel === this.transportCategory.tank) {
        //tankZung=1 || tankContainer=2
        this.handleAllFormControls(parsed.transport_mittel, parsed.tank_transport);
      }
      else if (parsed.transport_mittel === this.transportCategory.stuckGut) {
        if (parsed.stuckgut_transport === this.stuckgutType.articulatedTrain) {
          // Gliederzug=2 -> (i) mit anhanger=1  || (ii) ohne anhanger=2
          this.handleAllFormControls(parsed.transport_mittel, parsed.stuckgut_transport, parsed.articulatedBranch);
        }
        else {
          //sattelZug=1 || Transporter=3
          this.handleAllFormControls(parsed.transport_mittel, parsed.stuckgut_transport);
        }
      }
      this.Form.patchValue(parsed);
    } else {
      console.log('not data found from localStorage');

    }
  }
  handleAllFormControls(parent: TransportCategory | TankType | StuckgutType, child?: TankType | StuckgutType, subChild?: TrailerOption) {
    if (parent === this.transportCategory.tank) {
      console.log("Button parent TANK was clicked");
      this.activeStuckgutType = null
      this.activeTrailerOption = null;
      this.activeSubmitButton = false;
      this.activeTransportCategory = this.transportCategory.tank;

      if (this.Form) {
        Object.keys(this.Form.controls).forEach(key => this.Form.removeControl(key));
      }

      if (parent === this.transportCategory.tank && child === this.tankType.train) {
        console.log('Button child TANKZUNG was clicked');
        this.activeTankType = this.tankType.train

        this.Form = this.fb.group({
          transport_mittel: [this.activeTransportCategory],
          tank_transport: [this.activeTankType],
          lkw: this.fb.group({
            is_new: [false],
            value: ['', Validators.required],
          }),
          auflieger: this.fb.group({
            is_new: [false],
            value: ['', Validators.required],
          })
        });
        this.activeSubmitButton = true
        console.log("ctrl in train ", this.Form.controls);
      }
      if (parent === this.transportCategory.tank && child === this.tankType.container) {
        console.log('button child TANKCONTAINER was clicked');
        this.activeTankType = this.tankType.container;

        this.Form = this.fb.group({
          transport_mittel: [this.activeTransportCategory],
          tank_transport: [this.activeTankType],
          containerNumber: ['', Validators.required],
          lkw: this.fb.group({
            is_new: [false],
            value: ['', Validators.required],
          }),
          auflieger: this.fb.group({
            is_new: [false],
            value: ['', Validators.required],
          })
        });
        this.activeSubmitButton = true
        console.log("ctrl in container number ", this.Form.controls);
      }
    }
    else if (parent === this.transportCategory.stuckGut) {
      console.log("Button parent STUCKGUT was clicked");
      this.activeTankType = null;
      this.activeTrailerOption = null;
      this.activeSubmitButton = false;
      this.activeTransportCategory = this.transportCategory.stuckGut;

      if (this.Form) {
        Object.keys(this.Form.controls).forEach(key => this.Form.removeControl(key));
      }
      if (parent === this.transportCategory.stuckGut && child === this.stuckgutType.semiTrain) {
        console.log('button child SATTELZUG was clicked');
        this.activeSubmitButton = true
        this.activeTrailerOption = null
        this.activeStuckgutType = this.stuckgutType.semiTrain;

        this.Form = this.fb.group({
          transport_mittel: [this.activeTransportCategory],
          stuckgut_transport: [this.activeStuckgutType],
          select_semiTrain: ['', Validators.required],
          lkw: this.fb.group({
            is_new: [false],
            value: ['', Validators.required],
          }),
          auflieger: this.fb.group({
            is_new: [false],
            value: ['', Validators.required],
          })
        });
        console.log("controls in SATTELZUG :", this.Form.controls);
      }
      else if (parent === this.transportCategory.stuckGut && child === this.stuckgutType.transport) {
        console.log('button child TRANSPORTER was clicked');
        this.activeSubmitButton = true
        this.activeTrailerOption = null;
        this.activeStuckgutType = this.stuckgutType.transport;

        this.Form = this.fb.group({
          transport_mittel: [this.activeTransportCategory],
          stuckgut_transport: [this.activeStuckgutType],
          type_ctrl: ['', Validators.required],
          transporterGrp: this.fb.group({
            is_new: [false],
            value: ['', Validators.required],
          })
        });
        console.log("ctrl in transporter", this.Form.controls);
      }
      if (parent === this.transportCategory.stuckGut && child === this.stuckgutType.articulatedTrain) {
        console.log('button child GLIEDERZUG was clicked');
        this.activeSubmitButton = false;
        this.activeTrailerOption = null;
        this.activeStuckgutType = this.stuckgutType.articulatedTrain

        if (subChild === this.trailerOption.withoutTrailer) {
          console.log('button OHNE ANHANGER was clicked');
          this.activeTrailerOption = this.trailerOption.withoutTrailer

          this.Form = this.fb.group({
            transport_mittel: [this.activeTransportCategory],
            stuckgut_transport: [this.activeStuckgutType],
            articulatedBranch: [this.activeTrailerOption],
            select_tractor: ['', Validators.required],
            lkw: this.fb.group({
              is_new: [false],
              value: ['', Validators.required],
            })
          });
          this.activeSubmitButton = true
          console.log("ctrl in OHNE ANHANGER :", this.Form.controls);
        }
        else if (subChild === this.trailerOption.withTrailer) {
          console.log('button MIT ANHANGER was clicked');
          this.activeTrailerOption = this.trailerOption.withTrailer;

          this.Form = this.fb.group({
            transport_mittel: [this.activeTransportCategory],
            stuckgut_transport: [this.activeStuckgutType],
            articulatedBranch: [this.activeTrailerOption],
            select_semiTrain: ['', Validators.required],
            select_tractor: ['', Validators.required],

            lkw: this.fb.group({
              is_new: [false],
              value: ['', Validators.required],
            }),
            muldenNumber: this.fb.group({
              is_new: [false],
              value: ['', Validators.required],
            })
          });
          this.activeSubmitButton = true
          console.log("ctrl in MIT ANHANGER :", this.Form.controls);
        }
      }
    }
    else {
      console.log('no data founded!');
    }
    console.log("Category :", parent, "Child :", child, "SubChild :", subChild);
    //console.log(` Category ${parent} Child ${child} subChild ${subChild}`);

  }
  onAllSearchFilter(type: any, event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    //console.log(`${value}`);

    if (type === this.tankType.train) {
      this.filteredTrains = this.train.filter(item =>
        item.viewValue.toLowerCase().includes(value)
      );
    }
    else if (type === this.tankType.container) {
      this.filteredTrailers = this.trailer.filter(item =>
        item.viewValue.toLowerCase().includes(value)
      );
    }
    else if (type === this.trailerOption.withTrailer) {
      this.filteredmuldenNumber = this.muldenNumber.filter(item =>
        item.viewValue.toLowerCase().includes(value)
      );
    } else if (type === this.stuckgutType.transport) {
      this.filterTransports = this.transPorters.filter(item =>
        item.viewValue.toLowerCase().includes(value)
      );
    }
    else {
      console.log('failed search');
    }
  }
  onAllToggle(type: any) {

    if (type === this.tankType.train) {

      const controlGroup = this.Form.get('lkw') as FormGroup;
      const isNew = this.Form.get('is_new')?.value;

      if (isNew) {
        console.log(`lkw toggle ON ${isNew} `);
        controlGroup.get('value')?.reset();
      } else {
        console.log(`lkw toggle OFF ${isNew} `);
        controlGroup.get('value')?.reset();
      }
    } else if (type === this.tankType.container) {

      const controlGroup = this.Form.get('auflieger') as FormGroup;
      const isNew = this.Form.get('is_new')?.value;

      if (isNew) {
        console.log(` auf toggle ON ${isNew} `);
        controlGroup.get('value')?.reset();
      } else {
        console.log(`auf toggle OFF ${isNew}`);
        controlGroup.get('value')?.reset();
      }
    } else if (type === this.trailerOption.withTrailer) {

      const controlGroup = this.Form.get('muldenNumber') as FormGroup;
      const isNew = this.Form.get('is_new')?.value;

      if (isNew) {
        console.log(` in mitAnhanger muldenNumber toggle ON ${isNew}`);
        controlGroup.get('value')?.reset();
      } else {
        console.log(` in mitAnhanger muldenNumber toggle OFF ${isNew} `);
        controlGroup.get('value')?.reset();
      }
    } else if (type === this.stuckgutType.transport) {

      const controlGroup = this.Form.get('transporterGrp') as FormGroup;
      const isNew = this.Form.get('is_new')?.value;

      if (isNew) {
        console.log(` transporterGrp toggle ON ${isNew} `);
        controlGroup.get('value')?.reset();
      } else {
        console.log(`transporterGrp toggle OFF ${isNew} `);
        controlGroup.get('value')?.reset();
      }
    } else {
      console.log(`no toggle value ${isNaN}`);
    }
  }
  addNewRecord(type: any) {
    if (type === this.tankType.train) {

      const searchValue = this.lkw_select_input.value;
      const lkwGroup = this.Form.get('lkw') as FormGroup;

      lkwGroup.get('is_new')?.setValue(true)
      lkwGroup.get('value')?.setValue(searchValue);
      console.log('Latest value lkw:', searchValue);
      this.lkw_select_input.reset('');
    }
    else if (type === this.tankType.container) {

      const searchValue = this.auflieger_select_input.value;
      const aufliegerGroup = this.Form.get('auflieger') as FormGroup;

      aufliegerGroup.get('is_new')?.setValue(true)
      aufliegerGroup.get('value')?.setValue(searchValue);
      console.log('Latest value auf:', searchValue);
      this.auflieger_select_input.reset('');
    }
    else if (type === this.trailerOption.withTrailer) {

      const searchValue = this.muldenNumber_select_input.value;
      const trctNumCtrl = this.Form.get('muldenNumber') as FormGroup;

      trctNumCtrl.get('is_new')?.setValue(true)
      trctNumCtrl.get('value')?.setValue(searchValue);
      console.log('Latest value muldenNumber:', searchValue);
      this.muldenNumber_select_input.reset('');
    }
    else if (type === this.stuckgutType.transport) {

      const searchValue = this.transporterGrp_select_input.value;
      const transporterGrp = this.Form.get('transporterGrp') as FormGroup;

      transporterGrp.get('is_new')?.setValue(true)
      transporterGrp.get('value')?.setValue(searchValue);
      console.log('Latest value transporterGrp:', searchValue);
      this.transporterGrp_select_input.reset('');

    } else {
      console.log('no added new record');

    }
  }
  insertIDs(formData: any) {
    if (formData.lkw && formData.lkw.is_new === true) {
      const lastIndex = this.train.length - 1;
      let newId = 0;
      if (lastIndex >= 0) {
        newId = Number(this.train[lastIndex].id) + 1;
      }
      this.train.push({ id: newId, viewValue: formData.lkw.value });
      console.log("Train : ", this.train, " New LKW inserted : ", this.train[this.train.length - 1]);
    }

    if (formData.auflieger && formData.auflieger.is_new === true) {
      const lastIndex = this.trailer.length - 1;
      let newId = 0;
      if (lastIndex >= 0) {
        newId = Number(this.trailer[lastIndex].id) + 1;
      }
      this.trailer.push({ id: newId, viewValue: formData.auflieger.value });
      console.log("trailer : ", this.trailer, "New Auflieger inserted : ", this.trailer[this.trailer.length - 1]);
    }

    if (formData.muldenNumber && formData.muldenNumber.is_new === true) {
      const lastIndex = this.muldenNumber.length - 1;
      let newId = 0;
      if (lastIndex >= 0) {
        newId = Number(this.muldenNumber[lastIndex].id) + 1;
      }
      this.muldenNumber.push({ id: newId, viewValue: formData.muldenNumber.value });
      console.log("MulderNumber", this.muldenNumber, " New MuldenNumber inserted : ", this.muldenNumber[this.muldenNumber.length - 1]);
    }

    if (formData.transporterGrp && formData.transporterGrp.is_new === true) {
      const lastIndex = this.transPorters.length - 1;
      let newId = 0;
      if (lastIndex >= 0) {
        newId = Number(this.transPorters[lastIndex].id) + 1;
      }
      this.transPorters.push({ id: newId, viewValue: formData.transporterGrp.value });
      console.log("Transporter", this.transPorters, " New Transporter inserted : ", this.transPorters[this.transPorters.length - 1]);
    }

    console.log(" id insert check complete");
  }

  onSubmit() {
    const formData = this.Form.getRawValue();
    if (this.Form.valid) {
      this.insertIDs(formData)
      localStorage.setItem('allUserData', JSON.stringify(formData));
      console.log("Form Data : ", this.Form.getRawValue());
    }
    else {
      console.log('form is invalid!');
    }
  }
}
