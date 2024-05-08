import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRptDialogComponent } from './add-rpt-dialog.component';

describe('AddRptDialogComponent', () => {
  let component: AddRptDialogComponent;
  let fixture: ComponentFixture<AddRptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRptDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
