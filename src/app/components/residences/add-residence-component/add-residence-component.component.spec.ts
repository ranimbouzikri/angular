import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResidenceComponent } from './add-residence-component.component';

describe('AddResidenceComponentComponent', () => {
  let component: AddResidenceComponent;
  let fixture: ComponentFixture<AddResidenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddResidenceComponent]
    });
    fixture = TestBed.createComponent(AddResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
