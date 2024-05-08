import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperiorpayoutsComponent } from './superiorpayouts.component';

describe('SuperiorpayoutsComponent', () => {
  let component: SuperiorpayoutsComponent;
  let fixture: ComponentFixture<SuperiorpayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperiorpayoutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperiorpayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
