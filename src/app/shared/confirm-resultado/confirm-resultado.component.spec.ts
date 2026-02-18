import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmResultadoComponent } from './confirm-resultado.component';

describe('ConfirmResultadoComponent', () => {
  let component: ConfirmResultadoComponent;
  let fixture: ComponentFixture<ConfirmResultadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmResultadoComponent]
    });
    fixture = TestBed.createComponent(ConfirmResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
