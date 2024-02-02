import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidsuperiorComponent } from './unpaidsuperior.component';

describe('UnpaidsuperiorComponent', () => {
  let component: UnpaidsuperiorComponent;
  let fixture: ComponentFixture<UnpaidsuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidsuperiorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidsuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
