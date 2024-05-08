import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperiorReportComponent } from './superior-report.component';

describe('SuperiorReportComponent', () => {
  let component: SuperiorReportComponent;
  let fixture: ComponentFixture<SuperiorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperiorReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperiorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
