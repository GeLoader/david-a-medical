import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancecarePayoutsComponent } from './advancecare-payouts.component';

describe('AdvancecarePayoutsComponent', () => {
  let component: AdvancecarePayoutsComponent;
  let fixture: ComponentFixture<AdvancecarePayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancecarePayoutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancecarePayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
