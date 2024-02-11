import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidAgingComponent } from './unpaid-aging.component';

describe('UnpaidAgingComponent', () => {
  let component: UnpaidAgingComponent;
  let fixture: ComponentFixture<UnpaidAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
