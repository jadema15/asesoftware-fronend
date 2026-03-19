import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditPersonaComponent } from './confirm-edit-persona.component';

describe('ConfirmEditPersonaComponent', () => {
  let component: ConfirmEditPersonaComponent;
  let fixture: ComponentFixture<ConfirmEditPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmEditPersonaComponent]
    });
    fixture = TestBed.createComponent(ConfirmEditPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
