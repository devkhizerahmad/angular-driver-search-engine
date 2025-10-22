import { Component, OnInit } from '@angular/core';
import { level1, level1B1, level1B2, level1B2b2 } from './track-record';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-truck-record',
  templateUrl: './truck-record.component.html',
  styleUrls: ['./truck-record.component.scss']
})
export class TruckRecordComponent implements OnInit {

  level1Status = level1;
  level1B1Status = level1B1;
  level1B2Status = level1B2;
  level1B2b2Status = level1B2b2;

  activeLevel1: level1 | null = null;        // 0 = tank & 1 = stuckGut
  activeLevel1B1: level1B1 | null = null;    // 2 = tankTrain & 3 = tankContainer
  activeLevel1B2: level1B2 | null = null;    // 4 = semiTraian & 5 = Articulated & 6 = transportter
  activeLevelB2b2: level1B2b2 | null = null; // 7 = withTrailer & 8 = withoutTrailer

  lkw_select_input = new FormControl('');
  auflieger_select_input = new FormControl('');
  transporterGrp_select_input = new FormControl('');
  tractorNumberCtrl_select_input = new FormControl('');

  filteredTrains: any[] = [];
  filteredTrailers: any[] = [];
  filterTransports: any[] = [];
  filteredTractorNumber: any[] = [];

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
  type: any[] = [
    { id: 110, viewValue: 'Sedan' },
    { id: 111, viewValue: 'Mini copper' },
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
  tractorNumber: any[] = [
    { id: 16, viewValue: 'AUF007' },
    { id: 17, viewValue: 'tc-gh-12' },
    { id: 18, viewValue: 'df-ew-53' },
    { id: 19, viewValue: 'ks-we-45' },
  ];

  Form!: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.filteredTrains = this.train;
    this.filteredTrailers = this.trailer;
    this.filterTransports = this.transPorters;
    this.filteredTractorNumber = this.tractorNumber;

  }
  handleClick(action: number) {
    console.log("action : ", action);

    if (action === this.level1Status.tank) {
      console.log("Button TANK was clicked");
      this.activeLevel1B2 = null
      this.activeLevelB2b2 = null;
      this.activeLevel1 = this.level1Status.tank;
    } else if (action === this.level1B1Status.train) {
      console.log('Button TANKZUNG (train) was clicked');

      this.activeLevelB2b2 = null;
      this.activeLevel1B2 = null
      this.activeLevel1B1 = this.level1B1Status.train
      if (this.Form) {
        console.log("Controls remove in TANKZUNG");
        Object.keys(this.Form.controls).forEach(key => {
          this.Form.removeControl(key);
        });
      }
      this.Form = this.fb.group({
        transport_mittel: [this.level1Status.tank],
        tank_transport: [this.level1B1Status.train],
        lkw: this.fb.group({
          is_new: [false],
          value: ['', Validators.required],
        }),
        auflieger: this.fb.group({
          is_new: [false],
          value: ['', Validators.required],
        })
      });
      this.handleLkwSearchFilter();
      this.handleAufliegerSearchFilter();
      console.log("ctrl in train ", this.Form.controls);

    }
    else if (action === this.level1B1Status.container) {
      console.log('button TANKCONTAINER was clicked');
      this.activeLevel1B1 = this.level1B1Status.container;
      if (this.Form) {
        console.log("Controls remove in TANKCONTAINER");
        Object.keys(this.Form.controls).forEach(key => {
          this.Form.removeControl(key);
        });
      }
      this.Form = this.fb.group({
        transport_mittel: [this.level1Status.tank],
        tank_transport: [this.level1B1Status.container],
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
      this.handleLkwSearchFilter();
      this.handleAufliegerSearchFilter();
      console.log("ctrl in container number ", this.Form.controls);
    }
    else if (action === this.level1Status.stuckGut) {

      console.log("Button LKW was clicked");
      this.activeLevel1 = null;
      this.activeLevel1B1 = null;
      this.activeLevel1 = this.level1Status.stuckGut;
    }
    else if (action === this.level1B2Status.semiTrain) {
      console.log('button SATTELZUG (semiTraian) was clicked');
      this.activeLevelB2b2 = null
      this.activeLevel1B2 = this.level1B2Status.semiTrain

      if (this.Form) {
        console.log("Controls remove in SATTELZUG");
        Object.keys(this.Form.controls).forEach(key => {
          this.Form.removeControl(key);
        });
      }
      this.Form = this.fb.group({
        transport_mittel: [this.level1Status.stuckGut],
        stuckgut_transport: [this.level1B2Status.semiTrain],
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
      this.handleLkwSearchFilter();
      this.handleAufliegerSearchFilter();
      console.log("controls in SATTELZUG :", this.Form.controls);
    }
    else if (action === this.level1B2Status.articulatedTrain) {
      console.log('button GLIEDERZUG was clicked');
      this.activeLevelB2b2 = null;
      this.activeLevel1B2 = this.level1B2Status.articulatedTrain
    }
    else if (action === this.level1B2Status.transport) {
      console.log('button TRANSPORTER was clicked');
      this.activeLevelB2b2 = null;
      this.activeLevel1B2 = this.level1B2Status.transport

      if (this.Form) {
        console.log("Controls remove in transporter");
        Object.keys(this.Form.controls).forEach(key => {
          this.Form.removeControl(key);
        });
      }
      this.Form = this.fb.group({
        transport_mittel: [this.level1Status.stuckGut],
        stuckgut_transport: [this.level1B2Status.transport],
        type_ctrl: ['', Validators.required],
        transporterGrp: this.fb.group({
          is_new: [false],
          value: ['', Validators.required],
        })
      });
      this.handletransporterGrpSearchFilter();
      console.log("ctrl in transporter", this.Form.controls);
    }
    else if (action === this.level1B2b2Status.withTrailer) {
      console.log('button MIT ANHANGER was clicked');
      this.activeLevelB2b2 = this.level1B2b2Status.withTrailer

      if (this.Form) {
        console.log("Controls remove in MIT ANHANGER");
        Object.keys(this.Form.controls).forEach(key => {
          this.Form.removeControl(key);
        });
      }
      this.Form = this.fb.group({
        transport_mittel: [this.level1Status.stuckGut],
        stuckgut_transport: [this.level1B2Status.articulatedTrain],
        articulatedBranch: [this.level1B2b2Status.withoutTrailer],
        select_semiTrain: ['', Validators.required],
        select_tractor: ['', Validators.required],

        lkw: this.fb.group({
          is_new: [false],
          value: ['', Validators.required],
        }),
        tractorNumberCtrl: this.fb.group({
          is_new: [false],
          value: ['', Validators.required],
        })
      });
      this.handleLkwSearchFilter();
      this.handleTrctNumCtrlSearchFilter();
      console.log("ctrl in MIT ANHANGER :", this.Form.controls);
    }
    else if (action === this.level1B2b2Status.withoutTrailer) {
      console.log('button OHNE ANHANGER was clicked');
      this.activeLevelB2b2 = this.level1B2b2Status.withoutTrailer
      if (this.Form) {
        console.log("Controls remove in OHNE ANHANGER");
        Object.keys(this.Form.controls).forEach(key => {
          this.Form.removeControl(key);
        });
      }
      this.Form = this.fb.group({
        transport_mittel: [this.level1Status.stuckGut],
        stuckgut_transport: [this.level1B2Status.articulatedTrain],
        articulatedBranch: [this.level1B2b2Status.withoutTrailer],
        select_tractor: ['', Validators.required],
        lkw: this.fb.group({
          is_new: [false],
          value: ['', Validators.required],
        })
      });
      this.handleLkwSearchFilter();
      console.log("ctrl in OHNE ANHANGER :", this.Form.controls);
    } else {
      console.log('no button pressed');
    }
  }
  handleAllNewOption(newOptionSelect: string) {
    console.log(newOptionSelect);
    if (newOptionSelect === 'lkw') {
      const isNew = '';
      const lkwGroup = this.Form.get('lkw') as FormGroup;
      lkwGroup.get('is_new')?.setValue(isNew);
      lkwGroup.get('value')?.reset('');
      if (isNew) {
        console.log("New LKW");
      } else {
        console.log("Existing LKW");
      }
    }
    else if (newOptionSelect === 'auflieger') {
      const isNew = '';
      const aufGroup = this.Form.get('auflieger') as FormGroup;

      aufGroup.get('is_new')?.setValue(isNew);
      aufGroup.get('value')?.reset('');
      if (isNew) {
        console.log("New Auflieger");
      } else {
        console.log("Existing Auflieger");
      }
    }
    else if (newOptionSelect === 'transporterGrp') {
      const isNew = '';
      const transporterGrp = this.Form.get('transporterGrp') as FormGroup;

      transporterGrp.get('is_new')?.setValue(isNew);
      transporterGrp.get('value')?.reset('');
      if (isNew) {
        console.log("New transporterGrp");
      } else {
        console.log("Existing transporterGrp");
      }
    }
    else if (newOptionSelect === 'tractorNumberCtrl') {
      const isNew = '';
      const trctNumCtrlGroup = this.Form.get('tractorNumberCtrl') as FormGroup;

      trctNumCtrlGroup.get('is_new')?.setValue(isNew);
      trctNumCtrlGroup.get('value')?.reset('');
      if (isNew) {
        console.log("New tractorNumberCtrl");
      } else {
        console.log("Existing tractorNumberCtrl");
      }
    }
  }
  handleSearch(searchValue: any) {
    console.log(searchValue);

  }
  //         lkw section record

  onToggleLkw(event: any) {
    const isNew = event.checked;
    const lkwGroup = this.Form.get('lkw') as FormGroup;
    lkwGroup.get('is_new')?.setValue(isNew);
    lkwGroup.get('value')?.reset('');
    if (isNew) {
      console.log("toggle on LKW");
    } else {
      console.log("toggle of LKW");
    }
  }
  addNewTrain() {
    const searchValue = this.lkw_select_input.value;
    const lkwGroup = this.Form.get('lkw') as FormGroup;

    lkwGroup.get('is_new')?.setValue(true)
    lkwGroup.get('value')?.setValue(searchValue);
    console.log('Latest value lkw:', searchValue);
  }
  handleLkwSearchFilter() {
    this.lkw_select_input.valueChanges.subscribe((searchText) => {
      const search = searchText?.toLowerCase();
      this.filteredTrains = this.train.filter((t) =>
        t.viewValue.toLowerCase().includes(search)
      );
    });
  }
  //         auflieger section record

  onToggleAuflieger(event: any) {
    const isNew = event.checked;
    const aufGroup = this.Form.get('auflieger') as FormGroup;

    aufGroup.get('is_new')?.setValue(isNew);
    aufGroup.get('value')?.reset('');
    if (isNew) {
      console.log("toggle on Auflieger");
    } else {
      console.log("toggle off Auflieger");
    }
  }
  addNewTrailer() {
    const searchValue = this.auflieger_select_input.value;
    const aufliegerGroup = this.Form.get('auflieger') as FormGroup;
    aufliegerGroup.get('is_new')?.setValue(true)
    aufliegerGroup.get('value')?.setValue(searchValue);
    console.log('Latest value auf:', searchValue);
  }
  handleAufliegerSearchFilter() {
    this.auflieger_select_input.valueChanges.subscribe((searchText) => {
      const search = searchText?.toLowerCase();
      this.filteredTrailers = this.trailer.filter((t) =>
        t.viewValue.toLowerCase().includes(search)
      );
    });
  }

  // TractorNumberCtrl record sectioin

  onToggleTrctNumCtrl(event: any) {
    const isNew = event.checked;
    const trctNumCtrlGroup = this.Form.get('tractorNumberCtrl') as FormGroup;

    trctNumCtrlGroup.get('is_new')?.setValue(isNew);
    trctNumCtrlGroup.get('value')?.reset('');
    if (isNew) {
      console.log("toggle on tractorNumberCtrl");
    } else {
      console.log("Existing tractorNumberCtrl");
    }
  }
  handleTrctNumCtrlSearchFilter() {
    this.tractorNumberCtrl_select_input.valueChanges.subscribe((searchText) => {
      const search = searchText?.toLowerCase();
      this.filteredTractorNumber = this.tractorNumber.filter((t) =>
        t.viewValue.toLowerCase().includes(search)
      );
    });
  }
  addNewTractorNumber() {
    const searchValue = this.tractorNumberCtrl_select_input.value;
    const trctNumCtrl = this.Form.get('tractorNumberCtrl') as FormGroup;
    trctNumCtrl.get('is_new')?.setValue(true)
    trctNumCtrl.get('value')?.setValue(searchValue);
    console.log('Latest value tractorNumberCtrl:', searchValue);
  }
  // Transporter record sectioin

  onToggleTransporterGrp(event: any) {
    const isNew = event.checked;
    const transporterGrp = this.Form.get('transporterGrp') as FormGroup;

    transporterGrp.get('is_new')?.setValue(isNew);
    transporterGrp.get('value')?.reset('');
    if (isNew) {
      console.log("toggle on transporterGrp");
    } else {
      console.log("toggle off transporterGrp");
    }
  }
  handletransporterGrpSearchFilter() {
    this.transporterGrp_select_input.valueChanges.subscribe((searchText) => {
      const search = searchText?.toLowerCase();
      this.filterTransports = this.transPorters.filter((t) =>
        t.viewValue.toLowerCase().includes(search)
      );
    });
  }
  addNewTransporter() {
    const searchValue = this.transporterGrp_select_input.value;
    const transporterGrp = this.Form.get('transporterGrp') as FormGroup;
    transporterGrp.get('is_new')?.setValue(true)
    transporterGrp.get('value')?.setValue(searchValue);
    console.log('Latest value transporterGrp:', searchValue);
  }
  insertIDs(formData: any) {
    // console.log(raw);
    if (formData.lkw.is_new === true) {

      const lastIndex = this.train.length - 1;
      let newlkwId = 0;

      if (lastIndex >= 0) {
        newlkwId = Number(this.train[lastIndex].id) + 1;
        this.train.push({ id: newlkwId, viewValue: formData.lkw.value });
      }
      console.log("new id to insert", newlkwId, "updated lkw: ", this.train);
    }
    if (formData.auflieger.is_new === true) {
      const lastIndex = this.trailer.length - 1;
      let newAufliegerId = 0;

      if (lastIndex >= 0) {
        newAufliegerId = Number(this.trailer[lastIndex].id) + 1;
        this.trailer.push({ id: newAufliegerId, viewValue: formData.auflieger.value });
      }
      console.log("new id to insert :", newAufliegerId, "updated auflieger: ", this.trailer);
    }

  }
  onSubmit() {
    if (this.Form.valid) {
      console.log(this.Form.getRawValue());
      const formData = this.Form.getRawValue();
      this.insertIDs(formData)
    } else {
      console.log('form is invalid!');
    }
    this.Form.patchValue({})
  }
}
