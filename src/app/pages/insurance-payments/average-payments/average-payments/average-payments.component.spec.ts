import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragePaymentsComponent } from './average-payments.component';

describe('AveragePaymentsComponent', () => {
  let component: AveragePaymentsComponent;
  let fixture: ComponentFixture<AveragePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AveragePaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AveragePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
