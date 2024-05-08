import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditptComponent } from './editpt.component';

describe('EditptComponent', () => {
  let component: EditptComponent;
  let fixture: ComponentFixture<EditptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
