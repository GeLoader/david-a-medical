import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtmasterComponent } from './ptmaster.component';

describe('PtmasterComponent', () => {
  let component: PtmasterComponent;
  let fixture: ComponentFixture<PtmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
