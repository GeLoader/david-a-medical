import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewptComponent } from './addnewpt.component';

describe('AddnewptComponent', () => {
  let component: AddnewptComponent;
  let fixture: ComponentFixture<AddnewptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
