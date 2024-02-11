import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildreportComponent } from './buildreport.component';

describe('BuildreportComponent', () => {
  let component: BuildreportComponent;
  let fixture: ComponentFixture<BuildreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
