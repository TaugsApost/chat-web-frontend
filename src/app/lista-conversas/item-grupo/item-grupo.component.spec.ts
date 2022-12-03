import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGrupoComponent } from './item-grupo.component';

describe('ItemGrupoComponent', () => {
  let component: ItemGrupoComponent;
  let fixture: ComponentFixture<ItemGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
