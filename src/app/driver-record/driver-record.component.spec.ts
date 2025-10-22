import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRecordComponent } from './driver-record.component';

describe('DriverRecordComponent', () => {
  let component: DriverRecordComponent;
  let fixture: ComponentFixture<DriverRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverRecordComponent]
    });
    fixture = TestBed.createComponent(DriverRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
