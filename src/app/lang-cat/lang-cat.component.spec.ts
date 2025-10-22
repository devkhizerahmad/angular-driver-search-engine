import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangCatComponent } from './lang-cat.component';

describe('LangCatComponent', () => {
  let component: LangCatComponent;
  let fixture: ComponentFixture<LangCatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LangCatComponent]
    });
    fixture = TestBed.createComponent(LangCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
