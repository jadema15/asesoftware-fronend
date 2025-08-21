import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaComponent } from './tarjeta.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Stub para app-imagen
@Component({
  selector: 'app-imagen',
  template: ''
})
class ImagenStubComponent {}

describe('TarjetaComponent', () => {
  let component: TarjetaComponent;
  let fixture: ComponentFixture<TarjetaComponent>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
      declarations: [TarjetaComponent, ImagenStubComponent],
      imports: [SharedModule],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA], // <-- podés sacarlo si usás el stub
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
