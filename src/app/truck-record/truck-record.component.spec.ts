import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckRecordComponent } from './truck-record.component';

describe('TruckRecordComponent', () => {
  let component: TruckRecordComponent;
  let fixture: ComponentFixture<TruckRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TruckRecordComponent]
    });
    fixture = TestBed.createComponent(TruckRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
