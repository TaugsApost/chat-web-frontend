import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCreditosComponent } from './pagina-creditos.component';

describe('PaginaCreditosComponent', () => {
  let component: PaginaCreditosComponent;
  let fixture: ComponentFixture<PaginaCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaCreditosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
