import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComtableComponent } from './comtable.component';

describe('ComtableComponent', () => {
  let component: ComtableComponent;
  let fixture: ComponentFixture<ComtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
