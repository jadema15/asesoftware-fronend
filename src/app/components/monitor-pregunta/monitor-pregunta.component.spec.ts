import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorPreguntaComponent } from './monitor-pregunta.component';

describe('MonitorPreguntaComponent', () => {
  let component: MonitorPreguntaComponent;
  let fixture: ComponentFixture<MonitorPreguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorPreguntaComponent]
    });
    fixture = TestBed.createComponent(MonitorPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
