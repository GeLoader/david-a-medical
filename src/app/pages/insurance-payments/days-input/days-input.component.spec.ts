import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysInputComponent } from './days-input.component';

describe('DaysInputComponent', () => {
  let component: DaysInputComponent;
  let fixture: ComponentFixture<DaysInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
