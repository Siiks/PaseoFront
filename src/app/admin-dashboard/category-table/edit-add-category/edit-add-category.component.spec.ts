import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddCategoryComponent } from './edit-add-category.component';

describe('EditAddCategoryComponent', () => {
  let component: EditAddCategoryComponent;
  let fixture: ComponentFixture<EditAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
