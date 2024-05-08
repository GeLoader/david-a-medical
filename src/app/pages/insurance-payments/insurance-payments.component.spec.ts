import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePaymentsComponent } from './insurance-payments.component';

describe('InsurancePaymentsComponent', () => {
  let component: InsurancePaymentsComponent;
  let fixture: ComponentFixture<InsurancePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurancePaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsurancePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
