import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPayoutsComponent } from './partner-payouts.component';

describe('PartnerPayoutsComponent', () => {
  let component: PartnerPayoutsComponent;
  let fixture: ComponentFixture<PartnerPayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerPayoutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
