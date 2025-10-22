import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrecordComponent } from './allrecord.component';

describe('AllrecordComponent', () => {
  let component: AllrecordComponent;
  let fixture: ComponentFixture<AllrecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllrecordComponent]
    });
    fixture = TestBed.createComponent(AllrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
