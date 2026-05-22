import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaPeliculasComponent } from './galeria-peliculas.component';

describe('GaleriaPeliculasComponent', () => {
  let component: GaleriaPeliculasComponent;
  let fixture: ComponentFixture<GaleriaPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GaleriaPeliculasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
