import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenComponent } from './imagen.component';
import { SharedModule } from 'src/app/shared/shared-module';

describe('ImagenComponent', () => {
  let component: ImagenComponent;
  let fixture: ComponentFixture<ImagenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagenComponent],
      imports: [SharedModule], 
    });
    fixture = TestBed.createComponent(ImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
