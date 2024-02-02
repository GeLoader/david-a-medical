import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidAdvancecareComponent } from './unpaid-advancecare.component';

describe('UnpaidAdvancecareComponent', () => {
  let component: UnpaidAdvancecareComponent;
  let fixture: ComponentFixture<UnpaidAdvancecareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidAdvancecareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidAdvancecareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
