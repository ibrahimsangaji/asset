import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GihistoryComponent } from './gihistory.component';

describe('GihistoryComponent', () => {
  let component: GihistoryComponent;
  let fixture: ComponentFixture<GihistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GihistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GihistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
