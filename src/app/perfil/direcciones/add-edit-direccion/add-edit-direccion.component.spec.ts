import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDireccionComponent } from './add-edit-direccion.component';

describe('AddEditDireccionComponent', () => {
  let component: AddEditDireccionComponent;
  let fixture: ComponentFixture<AddEditDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
