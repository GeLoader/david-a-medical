import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewreportComponent } from './addnewreport.component';

describe('AddnewreportComponent', () => {
  let component: AddnewreportComponent;
  let fixture: ComponentFixture<AddnewreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
