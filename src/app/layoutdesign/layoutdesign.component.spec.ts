import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutdesignComponent } from './layoutdesign.component';

describe('LayoutdesignComponent', () => {
  let component: LayoutdesignComponent;
  let fixture: ComponentFixture<LayoutdesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutdesignComponent]
    });
    fixture = TestBed.createComponent(LayoutdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
