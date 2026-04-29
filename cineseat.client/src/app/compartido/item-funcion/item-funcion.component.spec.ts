import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFuncionComponent } from './item-funcion.component';

describe('ItemFuncionComponent', () => {
  let component: ItemFuncionComponent;
  let fixture: ComponentFixture<ItemFuncionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemFuncionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
