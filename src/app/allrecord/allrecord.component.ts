import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allrecord',
  templateUrl: './allrecord.component.html',
  styleUrls: ['./allrecord.component.scss']
})
export class AllrecordComponent implements OnInit {

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;
  selectedIndex = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const step = params['step'];
      //console.log("ng step", step);

      if (step === 'truck') {
       // console.log("truck:", this.selectedIndex);
        this.selectedIndex = 1;
        //console.log("truck 1:", this.selectedIndex);
      } else {
        //console.log("truck else :", this.selectedIndex);
        this.selectedIndex = 0;
        //console.log("truck else 1:", this.selectedIndex);
      }
    });
  }

  onStepChange(event: any) {
    const step = event.selectedIndex === 0 ? 'driver' : 'truck';
   // console.log("index :", event.selectedIndex, " current step :", step, " event :", event);

    this.router.navigate([], {
      queryParams: { step },
      queryParamsHandling: 'merge'
    });
  }
}
