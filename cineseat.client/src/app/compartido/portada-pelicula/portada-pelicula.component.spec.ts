import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortadaPeliculaComponent } from './portada-pelicula.component';

describe('PortadaPeliculaComponent', () => {
  let component: PortadaPeliculaComponent;
  let fixture: ComponentFixture<PortadaPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortadaPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortadaPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
