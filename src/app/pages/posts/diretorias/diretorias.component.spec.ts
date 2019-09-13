import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretoriasComponent } from './diretorias.component';

describe('DiretoriasComponent', () => {
  let component: DiretoriasComponent;
  let fixture: ComponentFixture<DiretoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
