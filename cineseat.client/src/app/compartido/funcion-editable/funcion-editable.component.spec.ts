import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionEditableComponent } from './funcion-editable.component';

describe('FuncionEditableComponent', () => {
  let component: FuncionEditableComponent;
  let fixture: ComponentFixture<FuncionEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuncionEditableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
