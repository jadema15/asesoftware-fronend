import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurnosComponent } from './turnos.component';
import { SharedTestingModule } from 'src/app/shared/shared-test-module';
import { TurnoService } from 'src/app/services/turno.service';

describe('TurnosComponent', () => {
  let component: TurnosComponent;
  let fixture: ComponentFixture<TurnosComponent>;
  let turnoServiceSpy: jasmine.SpyObj<TurnoService>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [TurnosComponent], 
      imports: [SharedTestingModule ]         
    });
    fixture = TestBed.createComponent(TurnosComponent);
    component = fixture.componentInstance;    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mi primer test', ()=>{
    expect(component).toBeTruthy();
  })

  it('Debe retornar un texto en mayusculas', ()=>{
     expect(component.getToUpperCase('hola mundo')).toBe('HOLA MUNDO')
  })

  it('Debe retornar false, cuando la lista es vacia', ()=>{
    expect(component.hasTurnos()).toBeFalse()
  })
});
